import React from 'react';
import { Route, withRouter } from 'react-router-dom';
//import { LogIn } from "../desktop/accounts/LoginStart";
//import {LoggedOut} from "../desktop/accounts/LoggedOut";
//this module is used to get a backdoor to the react router history object.
//did not want ot pass history object all the way through to utility modules
const historyModel = {
    loaded: false,
    history: null
};
//<Route exact path="/login" component={LogIn} />
const LoginRouteComponent = ({history}) => {
    setHistory(history);
    return (
        <Route exact path="/noneExisting" component={<span/>} />
    );
};

const setHistory = (history) => {
    historyModel.history = history;
    historyModel.loaded = true;
};

export const getHistory = () => {
    return historyModel;
};

export const navigate = (location) => {
    window.location.href = location;
};

// noinspection JSCheckFunctionSignatures
export const getLoginRoute = () => withRouter(LoginRouteComponent);