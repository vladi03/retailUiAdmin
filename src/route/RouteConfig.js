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

export class RouteComponent extends React.Component {

    constructor() {
        super();
        this.state = { isMobile: window.innerWidth <= 760 };
    }

    componentDidMount() {
        initAuthStore();
        const checkSize = ()=> {
            // noinspection JSCheckFunctionSignatures
            this.setState({isMobile: window.innerWidth <= 760});
        };
        window.addEventListener("resize", checkSize);
        const { user, getAccessTokenSilently } = this.props.auth0;
        const getToken = async () =>{
            try {
                const accessToken = await getAccessTokenSilently();
                console.log(accessToken);
                setTokenValue(accessToken);
            } catch (ex) {
                console.log("---------------");
                console.log(ex.message || ex);
            }
        };

        getToken();
    }

    render() {
        const LoginRoute = getLoginRoute();
        const {isMobile} = this.state;
        const MenuNav = FullMenuNav; //isMobile ? MobileNav :
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