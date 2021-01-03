import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Snackbar, Chip, Avatar} from "@material-ui/core";

const useStyle = makeStyles({
    alertLabel: {
        fontSize: 20
    }
});

export const Alert = ({errorMessage, onCloseAlert}) => {
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