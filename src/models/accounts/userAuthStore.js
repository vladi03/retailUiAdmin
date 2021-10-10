import {getUserProfile} from "./userMessages";

const userAuthData = {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name') || "",
    picUrl: localStorage.getItem('picUrl') || "",
    email: localStorage.getItem('email') || "",
    expiresOn: localStorage.getItem('expiresOn') || "",
    featurePermissions: [1],
    userDomain: localStorage.getItem('userDomain') || "",
    catalogApi: process.env.CATALOG_API
};

export const hasToken = () => !!userAuthData.token;

const setLogOutTimer = (expiresOn) => {
    const {navigate} = require("../../route/history");
    clearLogOutTimer();
    //time out 60 seconds before token expires
    const msToTimeOut = (expiresOn * 1000 ) - new Date() - 60000;

    if(msToTimeOut > 30) {
        userAuthData.logOutTimer = setTimeout(
            () => navigate("#/logout"),
            msToTimeOut
        );
    } else if (expiresOn > 0) {
        navigate("#/logout");
    }
};

// noinspection JSUnusedGlobalSymbols
export const readToken = (token) => {
    const split = token && token.split('.');
    if(split && split.length > 0) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    else
        return {};
};

try {
    const stringFeatures = localStorage.getItem('featurePermissions');
    userAuthData.featurePermissions = stringFeatures ? JSON.parse(stringFeatures) : [];

    if(userAuthData.token) {
        const tokenData = readToken(userAuthData.token);
        localStorage.setItem('expiresOn', tokenData.exp);
        userAuthData.expiresOn = tokenData.exp;

        setLogOutTimer(tokenData.exp);
        console.log("token from local storage");
    }
} catch (ex) {
    userAuthData.featurePermissions = [];
}

export const setTokenValue = (token) => {
    localStorage.setItem('token', token);
    userAuthData.token = token;
    const tokenData = readToken(token);

    setLogOutTimer(tokenData.exp);
};

export const initAuthStore = ()=> {
    setLogOutTimer(userAuthData.expiresOn);
};



const clearLogOutTimer = () => {
    if(userAuthData.logOutTimer > -1) {
        clearTimeout(userAuthData.logOutTimer);
        userAuthData.logOutTimer = -1;
    }
};

export const isLoggedIn = () => userAuthData.token && true;

export const getStore = () => {

    return userAuthData;
};

// noinspection JSUnusedGlobalSymbols
export const getFullName = () =>
    userAuthData.name;

export const hasFeature = (featureId) => {
    //console.log("---- token hasFeature ----");
    //console.log(userAuthData.token);
    return userAuthData.featurePermissions.indexOf(featureId) > -1 || true;
};

// noinspection JSUnusedGlobalSymbols
export const getAuthHeaderValue = () => {
    return userAuthData.token !== null ? `bearer ${userAuthData.token}` : "";
};

export const setUserData = async ({name, picture, email, sub}) => {
    userAuthData.featurePermissions = [1];
    //localStorage.setItem('token', token);
    const domain = await getUserDomain(sub);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('picUrl', picture);
    localStorage.setItem('userDomain', domain);
    localStorage.setItem('featurePermissions',
        JSON.stringify(userAuthData.featurePermissions));

    userAuthData.name = name;
    userAuthData.email = email;
    userAuthData.picUrl = picture;
    userAuthData.userDomain = domain;
    userAuthData.featurePermissions = [1];

    return userAuthData;
};

export const clearToken = () => {
    //userAuthData.name = null;
    //userAuthData.email = null;
    //userAuthData.picUrl = null;
    userAuthData.featurePermissions = [];
    //localStorage.removeItem('name');
    //localStorage.removeItem('email');
    localStorage.removeItem('featurePermissions');
    localStorage.removeItem('userDomain');
    localStorage.removeItem("expiresOn");
    //localStorage.removeItem('picUrl');
};

export const getUserDomain = async (userId) => {
    const {userProfile} = await getUserProfile(userId);
    console.log("userProfile");
    console.log(userProfile);
    // noinspection JSUnresolvedVariable
    return userProfile && userProfile.app_metadata
        && userProfile.app_metadata.retailDomain;//"darbyfurnitureoutlet.com";
};
