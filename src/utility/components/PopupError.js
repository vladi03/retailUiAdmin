import React from  "react";
import {Snackbar, Paper, Typography} from "@material-ui/core";
import {Warning, Close, PriorityHigh} from "@material-ui/icons";
import PropTypes from 'prop-types';

export const PopupError = ({errorMessage, onClearErrorMessage, status}) => {
    const showPopup = !!(errorMessage && errorMessage.length > 0);
    let statusColor = "#ffffff";
    let StatusIcon = Warning;
    if(status === "success" && showPopup) {
        statusColor = "#1ead29";
        StatusIcon = PriorityHigh;
    } else if(showPopup)
        statusColor = "#ff525b";

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal : "center" }}
            open={showPopup}
            autoHideDuration={6000}
            onClose={onClearErrorMessage}>
            <Paper style={{
                padding: 10,
                backgroundColor: statusColor,
                display:"flex"}}
                   elevation={3}>
                <StatusIcon style={{marginRight: 15, color:"white"}} />
                <Typography style={{color: "white"}}>{errorMessage}</Typography>
                <Close onClick={onClearErrorMessage}
                       style={{marginLeft: 15, color:"white", cursor: "pointer"}}
                />
            </Paper>
        </Snackbar>
    );
};

PopupError.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onClearErrorMessage: PropTypes.func.isRequired
};