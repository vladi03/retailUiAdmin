import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getSiteParams = async () => {
    const {catalogApi , token, userDomain} = getStore();
    //
    const url = `${catalogApi}/catalogApi/api/v1/site/${userDomain}`;
    const payloadGeneric = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                site: result && result.length > 0 ? result[0] : { },
                siteLoading: false
            };
        }).catch((error) => {
            return {
                site: {},
                siteLoading: false,
                siteLoadError: error.message || error
            };
        });
};

export const saveSite = async (itemToSave)=>{
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/site`;
    const payloadGeneric = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(itemToSave)
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                saveSiteResult: result,
                activeSaveItem: itemToSave,
                siteLoading: false,
                siteHasError: false,
            };
        }).catch((error) => {
            return {
                success: false,
                siteHasError: true,
                siteLoading: false,
                siteLoadError: error.message || error
            };
        });
};
