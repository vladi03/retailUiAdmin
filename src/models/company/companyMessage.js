import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getNewLocation = () => {
    ////catalogapi/api/v1/company/location/new
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/company/location/new/${userDomain}`;
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
                activeLocationItem: result,
                locationListLoading: false
            }
        }).catch((error) => {
            return {
                activeLocationItem: null,
                locationListLoading: false,
                locationListLoadError: error.message || error
            };
        });
};

export const getLocationList = async () => {
    const {catalogApi , token, userDomain} = getStore();
    //
    const url = `${catalogApi}/catalogApi/api/v1/company/locations/${userDomain}`;
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
                locationList: result,
                locationListLoading: false
            }
        }).catch((error) => {
            return {
                locationList: [],
                locationListLoading: false,
                locationListLoadError: error.message || error
            };
        });
};

export const deleteLocationRecord = (locationId) => {
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/company/location/${locationId}`;
    const payloadGeneric = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            /* result
            {
                "deletedCount": 1
            }
            */
            return {
                deleteLocationResult: result,
                locationListLoading: false
            }
        }).catch((error) => {
            return {
                deleteLocationResult: false,
                locationListLoading: false,
                deleteLocationResultError: error.message || error
            };
        });
};

export const saveLocation = async (itemToSave)=>{
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/company/location`;
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
                saveLocationResult: result,
                activeLocationItem: itemToSave,
                locationListLoading: false
            }
        }).catch((error) => {
            return {
                success: false,
                locationListLoading: false,
                locationListLoadError: error.message || error
            };
        });
};