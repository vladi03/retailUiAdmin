import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Snackbar, Chip, Avatar} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyle = makeStyles({
    alertLabel: {
        fontSize: 20
    }
});

const Alert = ({errorMessage, onCloseAlert}) => {
    const classes = useStyle();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center' }}
            open={errorMessage.length > 0}
            autoHideDuration={6000}
            onClose={()=> onCloseAlert()}>
            <Chip color="primary"
                  classes={{
                      label: classes.alertLabel
                  }}
                  onDelete={()=> onCloseAlert()}
                  avatar={<Avatar>A</Avatar>}
                  label={errorMessage}
                  size="medium"
            />
        </Snackbar>
    );
};

export class RouteComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            isMobile: window.innerWidth <= 760,
            errorMessage: "",
            showAlert: false
        };
    }

    onCloseAlert() {
        // noinspection JSCheckFunctionSignatures
        this.setState({errorMessage: ""});
    }

    componentDidMount() {
        setRouteComponent(this);
        initAuthStore();
        const checkSize = ()=> {
            // noinspection JSCheckFunctionSignatures
            this.setState({isMobile: window.innerWidth <= 760});
        };
        window.addEventListener("resize", checkSize);
        const { getAccessTokenSilently } = this.props.auth0;

        const getToken = async () =>{
            try {
                const accessToken = await getAccessTokenSilently();
                console.log("-------- Token Complete First Try -------");
                console.log(accessToken);
                setTokenValue(accessToken);
            } catch (ex) {
                //when login in with google account, you have to try twice to get token.
                getAccessTokenSilently().then((accessToken)=> {
                    setTokenValue(accessToken);
                    console.log("-------- Token Complete second Try-------");
                    console.log(accessToken);
                    console.log("-");
                }).catch((ex)=> {
                    console.log("-------- No Token -------");
                    console.log(ex.message || ex);
                });
            }
        };
        // noinspection JSIgnoredPromiseFromCall
        getToken();
    }

    render() {

        // noinspection JSUnusedLocalSymbols
        const { user, isLoading } = this.props.auth0;
        if(!isLoading) {
            console.log("--- user render ---");
            console.log(this.props.auth0);
        }
        const LoginRoute = getLoginRoute();
        const {isMobile, errorMessage} = this.state;
        // noinspection JSUnusedLocalSymbols
        const MenuNav = FullMenuNav; //isMobile ? MobileNav :
        //if(errorMessage !== "" ) //show error hear
        //    const tt = "";

        return (
            <GlobalProviders>
                <Alert
                    errorMessage={errorMessage}
                    onCloseAlert={() => this.onCloseAlert()}
                />
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