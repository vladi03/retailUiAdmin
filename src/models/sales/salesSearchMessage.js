import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";
//import {salesXlMap} from "./salesXlMap";

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
            const success = Array.isArray(result);// result.err === null;

            //if(success) {
            //    result.data.items = result; //salesXlMap(result); //result.da
            //}
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