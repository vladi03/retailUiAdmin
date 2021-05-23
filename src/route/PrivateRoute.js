import React, {Fragment} from 'react';
import { Redirect, Route} from 'react-router-dom';
import {hasFeature} from "../models/accounts/userAuthStore";
import {useAuth0} from "@auth0/auth0-react";

export const PrivateRoute = ({ history, permission, component: Component, ...rest }) => {
    const { isLoading, isAuthenticated } = useAuth0();

    const calcHasFeature = hasFeature(permission);
    const calcHasAuth = (isAuthenticated ) && calcHasFeature;//|| hasToken()

    return (
        <Route {...rest} render={(props) => {
            //hasFeature(permission) ||
            return (
                <Fragment>
                    {calcHasAuth && <Component {...props} />}
                    {!calcHasAuth && !isLoading &&
                    <Redirect push={true} to={{pathname: '/login', state: {from: props.location}}}/>
                    }
                    {!calcHasAuth && isLoading &&
                    <span>...Loading User Privileges</span>
                    }
                </Fragment>
            );
        }}
        />
    )
};