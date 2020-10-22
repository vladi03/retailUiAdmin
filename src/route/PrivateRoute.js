import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import {hasFeature} from "../models/accounts/userAuthStore";
import {useAuth0} from "@auth0/auth0-react";

export const PrivateRoute = ({ history, permission, component: Component, ...rest }) => {
    const { user, isLoading, isAuthenticated } = useAuth0();



    return (
        <Route {...rest} render={(props) => {
            //hasFeature(permission) ||
            return (
                ((isAuthenticated && hasFeature(permission)) || isLoading) ?
                    <Component {...props} />
                    :
                    <Redirect push={true} to={{pathname: '/login', state: {from: props.location}}}/>
            )
        }}
        />
    )
};