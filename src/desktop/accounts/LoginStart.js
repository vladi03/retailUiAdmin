import React, {useState} from "react";
import { Card, CardContent,
    CardActions, Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Input as LoginIcon } from '@material-ui/icons';
import accountModel from "../../models/accounts/accountModel";
import {connectArray} from "../../utility/helpers";


export const LogInComponent = ({userNotAuthorized, firstName, lastName,
                                   onSetAccount, onCreateProfile, onFaceLogin, faceLoginMessage,profileLoading}) => {
    const classes = useStyles();
    const [faceRecognition, openFaceRecognition] = useState(false);
    const [createProfile, openCreateAccount] = useState(false);
    const [passwordLogin, setPasswordLogin] = useState(false);
    // noinspection HtmlUnknownTarget
    return (
        <form id="logon-submit"
              action="/login/google/source"
              className={classes.mainContainer}>
            <Card style={{display: "flex"}}>
                <div className={classes.outerCard}>
                    <CardContent className={classes.cardContainer}>
                        <img src={"ncr_logo.jpg"}
                             className={classes.logo}/>

                        {userNotAuthorized && <div>User {firstName} {lastName} is not authorized to use this site</div>}
                    </CardContent>

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
    actionButton: {width: "80%", margin:"10px"},
    messageContainer: { display: "flex", width:235, margin:"40px auto"},
    iconSpacing: { marginRight: 12},
    outerCard: {margin: "45px auto"},
    cardActionsContainer:{display:'flex', flexDirection: 'column'}
});

export const LogIn = connectArray(LogInComponent, [accountModel]);
