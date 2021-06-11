import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const salesSearchByName = (name) => {
    const {catalogApi , token} = getStore(); //userDomain
    const url = `${catalogApi}/catalogApi/api/v1/sales/${name}`;
    const payloadGeneric = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            const success = result.err === null;
            return {
                salesSearch: success ? result.data : {rowCountFound: 0, rows: []},
                salesSearchLoading: false,
                salesSearchLoadError: success ? false : result.err
            }
        }).catch((error) => {
            return {
                salesSearchLoading: false,
                salesSearchLoadError: error.message || error
            };
        });
};