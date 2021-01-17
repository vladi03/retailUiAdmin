import React from "react";
import { Card, CardContent,
    CardActions, Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Input as LoginIcon } from '@material-ui/icons';
import accountModel from "../../models/accounts/accountModel";
import {connectArray} from "../../utility/helpers";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router-dom';

export const LogInComponent = ({}) => {
    const classes = useStyles();
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    // noinspection HtmlUnknownTarget
    return (
        isAuthenticated ?
        <Redirect push={true} to="/" /> :
        <form id="logon-submit"
              action="/login/google/source"
              className={classes.mainContainer}>
            <Card style={{display: "flex"}}>
                <div className={classes.outerCard}>
                    <CardContent className={classes.cardContainer}>
                        <img src={"retail-shop-flat-icon_small.png"}
                             className={classes.logo}/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.actionButton}
                                onClick={() => {
                                    loginWithRedirect(
                                        {returnTo: `${window.location.origin}/#/`}
                                    );
                                }}
                        >
                            <LoginIcon style={{marginRight: 10}}/> Login
                        </Button>

                    </CardActions>
                </div>
            </Card>
        </form>
    );
};

const useStyles = makeStyles({
    mainContainer:{width: "80%", maxWidth: 460, margin: '100px auto'},
    leftContainer: {height: 400,width: 300, paddingLeft: 4},
    cardContainer: {minHeight: 170,minWidth:240, textAlign:'center'},
    logo: {width: 250, margin: "auto"},
    actionButton: {width: "100%", margin:"10px"},
    messageContainer: { display: "flex", width:235, margin:"40px auto"},
    iconSpacing: { marginRight: 12},
    outerCard: {margin: "45px auto"},
    cardActionsContainer:{display:'flex', flexDirection: 'column'}
});

export const LogIn = connectArray(LogInComponent, [accountModel]);
