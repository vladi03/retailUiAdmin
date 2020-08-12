import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getCatalogList = async () => {
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog/${userDomain}`;
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
                catalogList: result,
                catalogListLoading: false
            }
        }).catch((error) => {
            return {
                catalogList: [],
                catalogListLoading: false,
                catalogListLoadError: error.message || error
            };
        });
};