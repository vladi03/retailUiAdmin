import React from "react";
import Webcam from "react-webcam";
import { Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const videoConstraints = {

};

export const WebcamCapture = ({setImage, loginCapture,}) => {
    const classes = useStyle();

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        },
        [webcamRef]
    );
    const enrollCapture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            enrollImage(imageSrc)
        },
        [webcamRef]
    );


    return (

        <div className={classes.webcamContainer}>

            <Webcam
                audio={false}
                ref={webcamRef}
                className={classes.webcam}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                videoConstraints={videoConstraints}
            />
                <Button variant="contained"
                        color="default"
                        className={classes.actionButton}
                        onClick={()=> {
                            capture(); }}> Take Picture</Button>

        </div>
    );
};
const useStyle = makeStyles({
    webcamContainer: {
    },
    actionButton:{
    },
    webcam:{
        width:'100%'
    }


});
