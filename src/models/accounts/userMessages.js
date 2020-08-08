import {getAuthHeaderValue} from "./userAuthStore";
import {getConfig} from "../configStore";
import {handleResponse} from "../../utility/helpers";

export const getHardCodeUserList = () => {
    const result = [
        {"firstName" : "Jim", "lastName" : "Bob", "userName" : "jbob"},
        {"firstName" : "Jane", "lastName" : "Smith", "userName" : "jsmith"},
        {"firstName" : "Bill", "lastName" : "Smith", "userName" : "bsmith"},
    ];
    return new Promise(({resolve}) => {
        resolve({
            users: result,
            usersLoading: false,
            usersLoaded: true,
            usersHasError: false,
            usersMessage: "",
            usersLoadMessageDetail: ""
        });
    });
};
export const createUserApi = (payload, action,firstName, lastName,  password, signatureSrc, userName) => {
    const {profileUrl, collectionId, profileApiCode, bucketName} = getConfig();

    const url = `${profileUrl}/api/trigAWSLogin?code=${profileApiCode}&bucketName=${bucketName}&action=${action}&collectionName=${collectionId}&firstName=${firstName}&lastName=${lastName}&password=${password}&userName=${userName}&userRole=teller`;
    const formData = new FormData();
    formData.append('image',payload);
    formData.append('signature', signatureSrc);


    const payloadGeneric = {
        method: "POST",
        credentials: 'same-origin',
        body: formData
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                token : result.FaceId,
                firstName:result.firstName,
                lastName:result.lastName,
                picUrl:result.imageUrl,
                signatureUrl: result.signatureUrl,
                userName:result.userName,
                userRole:result.userRole,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: false,
                profileLoadingMessage: "",
                profileLoadingMessageError: ""
            };
        }).catch((error) => {
            return {
                profile : null,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: true,
                profileLoadingMessage: "",
                profileLoadingMessageError: error.message
            };
        });
};
export const checkUserFace = (payload, action,firstName, lastName,) => {
    const {profileUrl, collectionId, profileApiCode, bucketName} = getConfig();
    //${profileUrl}
    const url = `${profileUrl}/api/trigawslogin?code=${profileApiCode}&bucketName=${bucketName}&action=login&collectionName=${collectionId}`;
    const formData = new FormData();
    formData.append('image',payload);


    const payloadGeneric = {
        method: "POST",
        credentials: 'same-origin',
        body: formData
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                token : result.FaceId,
                firstName:result.firstName,
                lastName:result.lastName,
                picUrl:result.imageUrl,
                signatureUrl: result.signatureUrl,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: false,
                profileLoadingMessage: "",
                profileLoadingMessageError: ""
            };
        }).catch((error) => {
            return {
                profile : null,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: true,
                profileLoadingMessage: "",
                profileLoadingMessageError: error.message
            };
        });
};
export const getUserList = () => {
    const {profileUrl, profilesApiCode} = getConfig();
    //${profileUrl}
    const url = `${profileUrl}/api/trigaccount?code=${profilesApiCode}`;



    const payloadGeneric = {
        method: "GET",
        credentials: 'same-origin',
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                users: result,
                usersLoading: false,
                usersLoaded: true,
                usersHasError: false,
                usersMessage: "",
                usersLoadMessageDetail: ""
            };
        }).catch((error) => {
            return {
                users: [],
                usersLoading: false,
                usersLoaded: true,
                usersHasError: true,
                usersMessage: "",
                usersLoadMessageDetail: error.message
            };
        });
};

export const getUserAccountPassword = (userName, password) =>{
    const {profileUrl, profilesApiCode} = getConfig();
    //${profileUrl}
    const url = `${profileUrl}/api/trigaccount?code=${profilesApiCode}&userName=${userName}&password=${password}`;
    const payloadGeneric = {
        method: "GET",
        credentials: 'same-origin',
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                token : result.FaceId,
                firstName:result.firstName,
                lastName:result.lastName,
                picUrl:result.imageUrl,
                signatureUrl: result.signatureUrl,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: false,
                profileLoadingMessage: "",
                profileLoadingMessageError: ""
            };
        }).catch((error) => {
            return {
                profile : null,
                profileLoading: false,
                profileLoaded: true,
                profileLoadingError: true,
                profileLoadingMessage: "",
                profileLoadingMessageError: error.message
            };
        });
};







