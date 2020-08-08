import React, {useState} from 'react';
import {useIsMobile} from "../../utility/useIsMobile";
import { SideStrip } from "fancy-menu"
import {makeStyles} from "@material-ui/core/styles";
import {Input
} from "@material-ui/icons";
import accountModel from "../../models/accounts/accountModel";
import {connectArray} from "../../utility/helpers";
import {getMenus} from "../../models/home/menuStore";

import { useAuth0 } from '@auth0/auth0-react';

const mainLinksAll = getMenus();

const bottomLinks = [
    {label : "Logout", icon: Input, link:"#/logout" }
];

export const FullMenuNavComponent = ({ children, firstName, lastName,
                                         userLoggedIn, picUrl, userFeatures  }) => {
    const isMobile = useIsMobile();
    const classes = useStyles(isMobile);

    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const mainLinks = mainLinksAll.filter(
        (link) => link.featureId === undefined ||
            userFeatures.indexOf(link.featureId) > -1);

    console.log(user);

    return (
        isAuthenticated &&
        <div>
            <SideStrip mainLinks={mainLinks}
                       bottomLinks={bottomLinks}
                       onMenuClose={() => {
                          // setOpenMenu(false);
                       }}
                       expandMenu={false}
                       userLabel={user.name}
                       imageUrl={decodeURIComponent(user.picture)}
            />
            <div className={classes.mainContainer}>
                {children}
            </div>
        </div> ||
            <div>{children}</div>
    );
};

export const FullMenuNav = connectArray(FullMenuNavComponent,[accountModel]);

const useStyles = (isMobile) => makeStyles({
    mainContainer:{marginLeft: isMobile ? 0 : 70},
})();

