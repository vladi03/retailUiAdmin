import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import {hasFeature} from "../models/accounts/userAuthStore";

export const PrivateRoute = ({ history, permission, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {

        return (
            hasFeature(permission) ?
                <Component {...props} />
                :
                <Redirect push={true}  to={{pathname: '/login', state: {from: props.location}}}/>
        )}}
    />
);