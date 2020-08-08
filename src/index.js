import './index.css'
import React from 'react'
import {render} from 'react-dom'
import RouteConfig from  "./route/RouteConfig";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';
import { Auth0Provider } from "@auth0/auth0-react";

const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        textColor: grey.A700,
        primary: {
            main: "#3d6090",
            success: "#4caf50",
            idle: yellow[500]
        },
        secondary: { main: "#428bca"}
    }
});

render(
    <Auth0Provider
        domain={process.env.AUTH_DOMAIN}
        clientId={process.env.AUTH_CLIENT_ID}
        audience={process.env.AUTH_AUDIENCE}
        redirectUri={window.location.origin}
    >
        <MuiThemeProvider theme={muiTheme}><RouteConfig /></MuiThemeProvider>
    </Auth0Provider>,
    document.querySelector('#app'));

