import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalProviders} from "../GlobalProviders";
import {getLoginRoute} from "./history";
import {FullMenuNav} from "../desktop/home/FullMenuNav";
import { LoggedOut } from "../desktop/accounts/LoggedOut";
import {LogIn} from "../desktop/accounts/LoginStart";
import {initAuthStore} from "../models/accounts/userAuthStore";
import {HomeMain} from "../desktop/home/HomeMain";
import {PrivateRoute} from "./PrivateRoute";
import { withAuth0 } from "@auth0/auth0-react";
import {setTokenValue, hasToken} from "../models/accounts/userAuthStore";
import {CategoryMaintenance} from "../desktop/home/CategoryMaintenance";
import {setRouteComponent} from "../utility/helpers";
import {PopupError} from "../utility/components/PopupError";
import {LocationMaintenance} from "../desktop/company/LocationMaintenance";


// noinspection JSUnusedLocalSymbols
export class RouteComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            isMobile: window.innerWidth <= 760,
            errorMessage: "",
            showAlert: false,
            alertStatus: "",
            tokenLoading: false,
            tokenLoaded: false
        };
    }

    onCloseAlert() {
        // noinspection JSCheckFunctionSignatures
        this.setState({errorMessage: "", alertStatus: ""});
    }

    componentDidMount() {
        setRouteComponent(this);
        initAuthStore();
        const checkSize = ()=> {
            // noinspection JSCheckFunctionSignatures
            this.setState({isMobile: window.innerWidth <= 760});
        };
        window.addEventListener("resize", checkSize);
    }

    render() {

        const getToken = async () =>{
            const { getAccessTokenSilently } = this.props.auth0;
            try {
                this.setState({tokenLoading: true});
                const accessToken = await getAccessTokenSilently();
                console.log("-------- Token Complete First Try -------");
                console.log(accessToken);
                setTokenValue(accessToken);
                this.setState({
                    errorMessage: "You Have Access",
                    alertStatus: "success",
                    //tokenLoading: false,
                    tokenLoaded: true
                });
            } catch (ex) {
                //when login in with google account, you have to try twice to get token.
                getAccessTokenSilently().then((accessToken)=> {
                    setTokenValue(accessToken);
                    console.log("-------- Token Complete second Try-------");
                    console.log(accessToken);
                    // noinspection JSCheckFunctionSignatures
                    this.setState({
                        errorMessage: "Access Allowed",
                        alertStatus: "success",
                        //tokenLoading: false,
                        tokenLoaded: true
                    });
                }).catch((ex)=> {
                    console.log("-------- No Token -------");
                    console.log(ex.message || ex);
                    this.setState({errorMessage: ex.message,
                        //tokenLoading: false
                    });
                });
            }
        };

        // noinspection JSUnusedLocalSymbols
        const { user, isLoading } = this.props.auth0;
        const {isMobile, errorMessage, alertStatus,
            tokenLoading, tokenLoaded} = this.state;

        if(!isLoading && !tokenLoading && !tokenLoaded && errorMessage === "") {
            console.log("--- user render ---");
            console.log({errorMessage, isLoading, tokenLoading, tokenLoaded});
            console.log(this.props.auth0);
            if(!hasToken())
                // noinspection JSIgnoredPromiseFromCall
                getToken();
        }
        const LogoutRoute = getLoginRoute();

        // noinspection JSUnusedLocalSymbols
        const MenuNav = FullMenuNav; //isMobile ? MobileNav :
        //if(errorMessage !== "" ) //show error hear
        //    const tt = "";

        return (
            <GlobalProviders>
                <PopupError
                    errorMessage={errorMessage}
                    onClearErrorMessage={() => this.onCloseAlert()}
                    status={alertStatus}
                />
                    <HashRouter>
                        <MenuNav>
                        <div>
                            <LogoutRoute />
                            <Route exact path="/login"
                                   component={LogIn} />
                            <Route exact path="/logOut" component={LoggedOut} />
                            <Route exact path="/logcomplete"
                                   component={LoggedOut} />

                            <PrivateRoute permission={1}
                                          exact path="/"
                                          component={isMobile ? HomeMain : HomeMain} />

                            <PrivateRoute permission={1}
                                          exact path="/location"
                                          component={isMobile ?
                                              LocationMaintenance : LocationMaintenance} />


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