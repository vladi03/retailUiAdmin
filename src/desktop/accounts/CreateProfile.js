import React, {Fragment, useRef, useState} from "react";
import {Button, TextField, FormControl, InputLabel} from "@material-ui/core";
import {SpinnerDownloading} from "../../utility/components";
import {WebcamCapture} from "./WebCamComponet";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {connectArray} from "../../utility/helpers";
import accountModel from "../../models/accounts/accountModel";
import SignatureCanvas from "react-signature-canvas";
import {useIsMobile} from "../../utility/useIsMobile";

export const CreateProfileComponent =({onCreateProfile, openCreateAccount, checkPassword, passwordMessage, confirmPasswordMessage, clearPasswordMessage, profileLoading}) =>{
    const [userInput, setUserInput] = useState({});
    const [takePicture, setCamera] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    //const [signatureURL, setSignature]= useState('');
    const [signatureButtons, showSignatureButtons] = useState(false);
    const classes = useStyles();
    const sigCanvas = useRef({});
    const isMobile = useIsMobile();

    return(
        <Container className={classes.container}>
            {!takePicture &&
                <>
                <TextField className={classes.inputField}
                    required
                    id="outlined-required"
                    label="First Name"
                    onChange={(event) => {
                        setUserInput({
                            ...userInput,
                            firstName: event.target.value
                        });
                    }}
                    variant="outlined"
                />
                    < TextField
                        className={classes.inputField}
                        required
                        id="outlined-required"
                        label="Last Name"
                        onChange={(event)=> {
                            setUserInput({...userInput,
                                lastName : event.target.value});
                        }}
                        variant="outlined"
                    />
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
                            //checkPassword(event.target.value);

                        }}
                        variant="outlined"
                        helperText={passwordMessage}
                    />

                    <TextField
                        className={classes.inputField}
                        required
                        error = {confirmPasswordMessage !== ''}
                        type="password"

                        id="outlined-required"
                        label="Confirm Password"
                        onChange={(event)=> {
                            setUserInput({...userInput,
                                confirmPassword : event.target.value});
                        }}
                        variant="outlined"
                        helperText={confirmPasswordMessage}
                    />
                    <FormControl className={classes.signatureContainer}>
                        <InputLabel id="demo-simple-select-label" className={classes.signatureLabel}>Signature *</InputLabel>

                        <SignatureCanvas
                        ref={sigCanvas}
                        onBegin = {()=>{
                        showSignatureButtons(true);
                        }}
                        canvasProps={(isMobile ? { width: '200px',height:'150px', className: classes.signatureCanvasMobile}
                        : { width: '400px',height:'200px', className: classes.signatureCanvasDesktop})}
                             />

                        { signatureButtons && <Container className={classes.signatureAction}>
                            <Button
                                className={classes.signatureButton}
                                onClick={() => {
                                    sigCanvas.current.clear()
                                }}>Clear</Button>
                            <Button
                                className={classes.signatureButton}
                                onClick={() => {
                                    const signature = {data:sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
                                        originalname:`${Date.now()}-signature.png`};
                                    setUserInput({
                                        ...userInput,
                                        signatureSrc:sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
                                    });
                                    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png").split(','))//    const split = imageSrc.split(',');
                                }}>Save</Button>
                        </Container>
                        }

                    </FormControl>
                    <Container className={classes.buttonContainer}>
                            <Button variant="contained"
                                    color="default"
                                    className={classes.buttonAction}
                                    onClick={() => {
                                        setUserInput({});
                                        openCreateAccount(false);
                                        clearPasswordMessage();
                                    }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained"
                                    color="primary"
                                    className={classes.buttonAction}

                                    disabled={(userInput.firstName === undefined ||
                                        userInput.lastName === undefined ||
                                        userInput.password === undefined || userInput.confirmPassword === undefined)
                                        //|| userInput.signatureSrc === undefined)
                                    /*|| (userInput.password !== userInput.confirmPassword)*/}
                                    onClick={() => {
                                        //setUserInput({});
                                       if( checkPassword(userInput.password, userInput.confirmPassword)) {
                                           setCamera(true);
                                           showSignatureButtons(false);
                                       }


                                        }}

                            >
                                Next
                            </Button>
                    </Container>
                </>
            }
            {takePicture && !imageSrc &&
                <WebcamCapture setImage={setImageSrc}/>

            }
            { imageSrc &&
            <>
                <img src={imageSrc}/>
                <span>{userInput.firstName} {userInput.lastName}</span>
                <img src={userInput.signatureSrc}/>

                <Button variant="contained"
                        color="default"
                        onClick={() => {
                            setUserInput({});
                            setImageSrc(null);
                            setCamera(false);
                            openCreateAccount(false);
                            clearPasswordMessage();
                        }}
                >
                    Cancel
                </Button>
                <Button variant="contained"
                        color="default"
                        onClick={() => {
                            setUserInput({...userInput, imageSrc});
                            onCreateProfile({...userInput, imageSrc});
                            clearPasswordMessage();

                        }}
                >
                    Confirm
                </Button>
            </>
            }
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
    signatureContainer:{

    },
    signatureCanvasDesktop:{
        width:'400px',
        border:'ridge',
        height:'200px',
        borderRadius:4

    },
    signatureCanvasMobile:{
        width:'200px',
        border:'ridge',
        height:'150px',
        borderRadius:4


    },

    signatureLabel:{
        top:'-10%',
        left:'2%'
    },
    signatureAction:{
        top:'80%',
        right:'2%',
        position:'absolute',
        width:"fit-content",
        padding:0
    },
    signatureButton:{
       padding:0,
        textTransform:'none'
    }
});
export const CreateProfile = connectArray(CreateProfileComponent, [accountModel]);
