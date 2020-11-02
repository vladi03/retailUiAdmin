import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const saveCatalogStatus = async (status, id)=>{
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog/${status}/${id}`;
    const payloadGeneric = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            return {
                success: true,
                saveCatalogStatusResult: result,
                catalogStatusLoading: false
            }
        }).catch((error) => {
            return {
                success: false,
                catalogStatusLoading: false,
                catalogListLoadError: error.message || error
            };
        });
};

export const deleteCatalog = async (catalog) => {
    const result = await deleteCatalogRecord(catalog._id);
    catalog.images.forEach((file) => deleteFile(file.id));
    return result;
};

const deleteCatalogRecord = (catalogId) => {
    ///catalogApi/api/v1/catalog/5f166166312ef8249c6a5b57
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/catalog/${catalogId}`;
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
                deleteCatalogResult: result,
                catalogListLoading: false
            }
        }).catch((error) => {
            return {
                deleteCatalogResult: false,
                catalogListLoading: false,
                deleteCatalogResultError: error.message || error
            };
        });
};

export const deleteFile = (fileId)=> {
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/catalog/file/${fileId}`;
    const payloadGeneric = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        }
    };
    return fetch(url, payloadGeneric)
        .then(handleResponse()).then((result) => {
            console.log("DELETE file result");
            console.log(result);
            return {
                deleteImageResult: result
            }
        }).catch((error) => {
            return {
                deleteImageResult: false,
                deleteImageResultError: error.message || error
            };
        });
};

export const uploadImage = async (fileToUpload) => {

    const formData = new FormData();
    formData.append("myFile", fileToUpload);

    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/catalog/file/800`;// 800 and 500
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
                imageUploading: false
            }
        }).catch((error) => {
            return {
                uploadImageResult: false,
                imageUploading: false,
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

export const getNewCatalog = () => {
    ///catalogapi/api/v1/catalog/new/darbyfurnitureoutlet.com
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/catalog/new/${userDomain}`;
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
                activeCatalogItem: result,
                catalogListLoading: false
            }
        }).catch((error) => {
            return {
                activeCatalogItem: null,
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