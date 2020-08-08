
const userAuthData = {
    token: localStorage.getItem('token'),
    firstName: localStorage.getItem('firstName') || "",
    lastName: localStorage.getItem('lastName') || "",
    picUrl: localStorage.getItem('picUrl') || "",
    signatureUrl: localStorage.getItem('signatureUrl') || "",
    featurePermissions: [],
    userId: localStorage.getItem('userId'),
    expiresOn: parseInt(localStorage.getItem('expiresOn')) || 0,
    logOutTimer: -1
};
try {
    const stringFeatures = localStorage.getItem('featurePermissions');
    userAuthData.featurePermissions = stringFeatures ? JSON.parse(stringFeatures) : [];
} catch (ex) {
    userAuthData.featurePermissions = [];
}

export const initAuthStore = ()=> {
    setLogOutTimer(userAuthData.expiresOn);
};

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

const clearLogOutTimer = () => {
    if(userAuthData.logOutTimer > -1) {
        clearTimeout(userAuthData.logOutTimer);
        userAuthData.logOutTimer = -1;
    }
};

export const isLoggedIn = () => userAuthData.token && userAuthData.token !== null;

export const getStore = () => userAuthData;
export const getFullName = () =>
    `${userAuthData.firstName} ${userAuthData.lastName}`;

export const hasFeature = (featureId) => {
    return userAuthData.featurePermissions.indexOf(featureId) > -1;
};

export const getAuthHeaderValue = () => {
    return userAuthData.token !== null ? `bearer ${userAuthData.token}` : "";
};

export const setToken = ({token, firstName, lastName, picUrl, signatureUrl, userName}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('picUrl', picUrl);
    localStorage.setItem('signatureUrl', signatureUrl);
    localStorage.setItem('userName', userName);

    userAuthData.token = token;
    userAuthData.firstName = firstName;
    userAuthData.lastName = lastName;
    userAuthData.picUrl = picUrl;
    userAuthData.signatureUrl = signatureUrl;

    //const tokenData = readToken(token);
    const tokenData = {
        id: `${firstName.substring(0,1)}${lastName}`,
        features: "[1,2,3,4,5,6]",
        exp: (new Date().getTime()/1000|0) + 86400 //one day is 86400 seconds
    };
    console.log(tokenData);
    localStorage.setItem('userId', tokenData.id);
    localStorage.setItem('featurePermissions', JSON.stringify(tokenData.features));
    localStorage.setItem('expiresOn', tokenData.exp);
    userAuthData.featurePermissions = tokenData.features;
    userAuthData.userId = tokenData.id;
    userAuthData.expiresOn = tokenData.exp;

    console.log(userAuthData);
    setLogOutTimer(tokenData.exp);
    return tokenData;
};

export const clearToken = () => {
    userAuthData.token = null;
    userAuthData.userId = null;
    userAuthData.featurePermissions = [];
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('featurePermissions');
    localStorage.removeItem('expiresOn');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
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
