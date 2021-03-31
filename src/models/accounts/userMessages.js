import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getUserProfile = async (userId) => {
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/users/${userId}`;
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
                userProfile: result,
                userProfileLoading: false,
                userProfileLoadHasError: false
            }
        }).catch((error) => {
            return {
                userProfile: null,
                userProfileLoading: false,
                userProfileLoadError: error.message || error,
                userProfileLoadHasError: true
            };
        });
};