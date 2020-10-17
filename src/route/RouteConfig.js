import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalProviders} from "../GlobalProviders";
import {getLoginRoute} from "./history";
import {FullMenuNav} from "../desktop/home/FullMenuNav";
import { LoggedOut } from "../desktop/accounts/LoggedOut";
import {initAuthStore} from "../models/accounts/userAuthStore";
import {HomeMain} from "../desktop/home/HomeMain";
import {PrivateRoute} from "./PrivateRoute";
import { withAuth0 } from "@auth0/auth0-react";
import {setTokenValue} from "../models/accounts/userAuthStore";
import {CategoryMaintenance} from "../desktop/home/CategoryMaintenance";
import {setRouteComponent} from "../utility/helpers";

export class RouteComponent extends React.Component {

    constructor() {
        super();
        this.state = { isMobile: window.innerWidth <= 760, errorMessage: "" };
    }

    componentDidMount() {
        setRouteComponent(this);
        initAuthStore();
        const checkSize = ()=> {
            // noinspection JSCheckFunctionSignatures
            this.setState({isMobile: window.innerWidth <= 760});
        };
        window.addEventListener("resize", checkSize);
        const { user, getAccessTokenSilently } = this.props.auth0;
        const getToken = async () =>{
            try {
                console.log("--- user ---");
                console.log(user);
                const accessToken = await getAccessTokenSilently();
                console.log("-------- Token Complete First Try -------");
                console.log(accessToken);
                setTokenValue(accessToken);
            } catch (ex) {
                //when login in with google account, you have to try twice to get token.
                getAccessTokenSilently().then((accessToken)=> {
                    setTokenValue(accessToken);
                    console.log("-------- Token Complete second Try-------");
                }).catch((ex)=> {
                    console.log("-------- No Token -------");
                    console.log(ex.message || ex);
                });
            }
        };
        getToken();
    }

    render() {
        const LoginRoute = getLoginRoute();
        const {isMobile, errorMessage} = this.state;
        const MenuNav = FullMenuNav; //isMobile ? MobileNav :
        //if(errorMessage !== "" ) //show error hear
        //    const tt = "";

        return (
            <GlobalProviders>
                    <HashRouter>
                        <MenuNav>
                        <div>
                            <LoginRoute/>
                            <Route exact path="/logOut"
                                   component={LoggedOut} />

                            <Route exact path="/logcomplete"
                                   component={LoggedOut} />


                            <PrivateRoute permission={1}
                                          exact path="/"
                                          component={isMobile ? HomeMain : HomeMain} />

                            <PrivateRoute permission={1}
                                          exact path="/category"
                                          component={isMobile ?
                                              CategoryMaintenance : CategoryMaintenance} />

                        </div>
                        </MenuNav>
                    </HashRouter>
            </GlobalProviders>
        );
    }
}

/*

 */

export default withAuth0(RouteComponent)