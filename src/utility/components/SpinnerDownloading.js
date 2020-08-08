import React from 'react';
import { CircularProgress} from '@material-ui/core';
import {withStyles} from "@material-ui/styles";
import {  PlayForWork as LoadingIcon} from '@material-ui/icons';

const styles = () => ({
    spinnerWrapper: {
        position: 'relative',
        margin: 'auto',

    },
    fabProgress: {
        color: "primary",
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
});

export const SpinnerDownloadingComponent = ({classes, spinnerSize, style, loading, children}) => {

    return (
        (children === undefined || loading) ?
            <div className={classes.spinnerWrapper} style={{...style, width: spinnerSize}}>
                <LoadingIcon color="secondary" style={{width: spinnerSize, height: spinnerSize}}/>
                <CircularProgress
                    size={spinnerSize}
                    className={classes.fabProgress}
                />
            </div> :
            children
    );
};

export const SpinnerDownloading = withStyles(styles)(SpinnerDownloadingComponent);

