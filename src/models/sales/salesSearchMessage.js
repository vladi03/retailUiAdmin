import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";
//import {salesXlMap} from "./salesXlMap";

export const salesSearchByName = (name, location) => {
    const {catalogApi , token} = getStore(); //userDomain
    const url = `${catalogApi}/catalogApi/api/v1/sales/${name}/${location}`;
    const payloadGeneric = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            const success = Array.isArray(result);

            return {
                salesSearch: success ? {
                    rowCountFound: result.length,
                        rows: [],
                        items: result
                }
                    : {rowCountFound: 0, rows: [], items: []},
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

export const salesHist = () => {
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/sales/hist`;
    const payloadGeneric = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            const success = Array.isArray(result);

            return {
                salesHist: success ? {
                        rowCountFound: result.length,
                        rows: [],
                        items: result
                    }
                    : {rowCountFound: 0, rows: [], items: []},
                salesHistLoading: false,
                salesHistLoadError: success ? false : result.err
            }
        }).catch((error) => {
            return {
                salesHistLoading: false,
                salesHistLoadError: error.message || error
            };
        });
};