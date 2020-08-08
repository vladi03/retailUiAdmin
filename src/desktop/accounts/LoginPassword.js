import React, {Fragment, useRef, useState} from "react";
import {Button, TextField, FormControl, InputLabel} from "@material-ui/core";
import {SpinnerDownloading} from "../../utility/components";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {connectArray} from "../../utility/helpers";
import accountModel from "../../models/accounts/accountModel";


export const LoginPasswordComponent =({ passwordMessage,  profileLoading,onPasswordLogin }) =>{
    const [userInput, setUserInput] = useState({});

    const classes = useStyles();


    return(
        <Container className={classes.container}>


            <TextField className={classes.inputField}
                           required
                           id="outlined-required"
                           label="UserName"
                           onChange={(event) => {
                               setUserInput({
                                   ...userInput,
                                   userName: event.target.value
                               });
                           }}
                           variant="outlined"
                />
                <TextField
                    className={classes.inputField}
                    required
                    error = {passwordMessage !== ''}
                    id="outlined-required"
                    label="Password"
                    type="password"

                    onChange={(event)=> {
                        setUserInput({...userInput,
                            password : event.target.value});

                    }}
                    variant="outlined"
                    helperText={passwordMessage}
                />




                <Button variant="contained"
                color="default"
                onClick={() => {
                    setUserInput({});
                           }}
                >
                Cancel
                </Button>
                <Button variant="contained"
                color="default"
                onClick={() => {
                    onPasswordLogin(userInput);
                            }}
                >
                Confirm
                </Button>



            {profileLoading && <SpinnerDownloading/>}
        </Container>
    )
};

const useStyles = makeStyles({
    container:{
        display:'flex',
        flexDirection:'column',
        textAlign:'center',
        //width:'460px'

    },
    inputField:{
        margin:'10px',
        width: '100%',
        marginLeft:0,
    },
    buttonContainer:{
        padding:0,
        width:'100%',
        marginTop:10
    },
    buttonAction:{
        marginRight:10,
    },

});
export const LoginPassword = connectArray(LoginPasswordComponent, [accountModel]);
