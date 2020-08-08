import React, {useState} from 'react';

import { Dialog, DialogActions, DialogContent, InputLabel,
    DialogTitle, Button, Avatar, MenuItem, Select, Slide} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const SignatureDialogComponent = ({ openDialog, showDialog, signature, showSignature, setOpenMovementSubmit}) => {
    const classes = useStyle();
    return(
        <Dialog
            className={classes.dialogRoot}
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Sign Cash Movement"}</DialogTitle>
            <DialogContent className={classes.signatureContainer} >
                {signature && <img src={signature}/>}

            </DialogContent>
            <DialogActions>

                <Button onClick={()=>{ showSignature(localStorage.getItem('signatureUrl'));
                    showDialog(false);
                    setOpenMovementSubmit(true);
                }} color="primary">
                    Add Signature
                </Button>
                <Button onClick={()=>{
                    showDialog(false);
                    showSignature(null) }}
                        color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    )
};
const useStyle = makeStyles({
    dialogInput: {
        width: "100%",
        marginBottom: 30
    },
    signatureContainer:{
      border:'ridge',
      borderRadius:4,

        minWidth: 200,
        minHeight:150,
        margin:30
    },
    dialogTitle: {
        marginTop: 5,
        marginLeft: 10
    },
    dialogTitleContainer : {
        display: "flex"
    },
    dialogRoot: {
        minWidth: 400,
        minHeight: 275,
    }
});
