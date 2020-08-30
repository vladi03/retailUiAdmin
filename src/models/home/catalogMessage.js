import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const uploadImage = async (fileToUpload) => {

    const formData = new FormData();
    formData.append("myFile", fileToUpload);

    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog/file`;
    const payloadGeneric = {
        method: "POST",
        headers: {
            //"Content-Type": "multipart/form-data;",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                uploadImageResult: result,
                imageLoading: false
            }
        }).catch((error) => {
            return {
                uploadImageResult: false,
                imageLoading: false,
                uploadImageResultError: error.message || error
            };
        });
};

export const saveCatalog = async (itemToSave)=>{
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog`;
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
                saveCatalogResult: result,
                activeCatalogItem: itemToSave,
                catalogListLoading: false
            }
        }).catch((error) => {
            return {
                success: false,
                catalogListLoading: false,
                catalogListLoadError: error.message || error
            };
        });
};

export const getCatalogList = async () => {
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog/domain/${userDomain}`;
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