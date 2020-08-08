import React from "react";

export const CheckError = ({hasError, errorMessage, errorDetail, children}) => {

    return (
        hasError ?
        <React.Fragment>
            {errorMessage} : <br />
            {errorDetail}
        </React.Fragment> :
            children
    )
};