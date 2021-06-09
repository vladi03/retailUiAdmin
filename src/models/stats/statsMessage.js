import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getHitReport = () => {
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/hitReport/${userDomain}`;
    const payloadGeneric = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            const hasData = Array.isArray(result);
            return {
                hitReport: hasData ? result : [],
                hitReportLoaded: hasData,
                hitReportLoading: false,
                hitReportLoadError: hasData ?  false : "Invalid Hit Data Returned",
            }
        }).catch((error) => {
            return {
                hitReportLoading: false,
                hitReportLoadError: error.message || error
            };
        });
};