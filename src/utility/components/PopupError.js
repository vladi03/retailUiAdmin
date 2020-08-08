import React from  "react";
import {Snackbar, Paper, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';

export const PopupError = ({errorMessage, onClearErrorMessage}) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal : "center" }}
            open={!!(errorMessage && errorMessage.length > 0)}
            autoHideDuration={6000}
            onClose={onClearErrorMessage}>
            <Paper style={{padding: 20, backgroundColor: "#ff838e"}} elevation={3}>
                <Typography style={{color: "white"}}>{errorMessage}</Typography>
            </Paper>
        </Snackbar>
    );
};

PopupError.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onClearErrorMessage: PropTypes.func.isRequired
};