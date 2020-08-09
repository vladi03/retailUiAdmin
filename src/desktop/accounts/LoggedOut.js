import React, { useEffect } from "react";
import {clearToken} from "../../models/accounts/userAuthStore";
import { Card, CardContent,
    CardActions, Button, Typography  } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Input as LoginIcon, Info } from '@material-ui/icons';
import accountModel from "../../models/accounts/accountModel";
import {connectArray} from "../../utility/helpers";
import {navigate} from "../../route/history";
import { useAuth0 } from "@auth0/auth0-react";

export const LoggedOutComponent = ({onNotifyMainNavOfLogOff, userLoggedIn}) => {

    const classes = useStyles();
    const { loginWithRedirect,
        logout,
        isAuthenticated,
        isLoading
    } = useAuth0();

    useEffect(() => {
        clearToken();
        if(isAuthenticated)
            logout({returnTo: `${window.location.origin}/#/logout`});

        if(userLoggedIn)
            onNotifyMainNavOfLogOff();
    });
    // noinspection HtmlUnknownAnchorTarget
    return (
        <form id="logout-submit"
              className={classes.mainContainer}>
            {!isLoading && !isAuthenticated &&
            <Card style={{display: "flex"}}>
                <div className={classes.outerCard}>
                    <CardContent className={classes.cardContainer}>
                        <img src={"retail-shop-flat-icon_small.jpg"}
                             className={classes.logo}/>
                        <div className={classes.messageContainer}>
                            <Info className={classes.iconSpacing}/><Typography>You have been logged out.</Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.actionButton}
                                onClick={() => {
                                    loginWithRedirect();
                                }}
                        >
                            <LoginIcon style={{marginRight: 10}}/> Login
                        </Button>

                    </CardActions>
                </div>
            </Card>
            }
            {(isLoading || isAuthenticated ) &&
                <span>... logging out please wait</span>
            }
        </form>
    )
};

export const LoggedOut = connectArray(LoggedOutComponent, [accountModel]);

const useStyles = makeStyles({
    mainContainer:{width: "80%", maxWidth: 460, margin: '100px auto'},
    leftContainer: {height: 400,width: 300, paddingLeft: 4},
    cardContainer: {minHeight: 170},
    logo: {width: 250, margin: "auto"},
    actionButton: {width: "80%", margin:"auto"},
    messageContainer: { display: "flex", width:235, margin:"40px auto"},
    iconSpacing: { marginRight: 12},
    outerCard: {margin: "45px auto"}
});