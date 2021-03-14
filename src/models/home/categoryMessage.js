import {getStore} from "../accounts/userAuthStore";
import {handleResponse} from "../../utility/helpers";

export const getCategoryList = async () => {
    const {catalogApi , token, userDomain} = getStore();
    if(!userDomain) {
        return {
            categoryList: [],
            categoryListLoading: false,
            categoryListLoadHasError: true,
            categoryListInit:false,
            categoryListLoadError: ""
        };
    } else {
        const url = `${catalogApi}/catalogApi/api/v1/category/domain/${userDomain}`;
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
                    categoryList: result,
                    categoryListLoading: false,
                    categoryListLoadHasError: false
                }
            }).catch((error) => {
                return {
                    categoryList: [],
                    categoryListLoading: false,
                    categoryListLoadHasError: true,
                    categoryListLoadError: error.message || error
                };
            });
    }
};

export const getNewCategory = () => {
    //catalogapi/api/v1/category/new/darbyfurnitureoutlet.com
    const {catalogApi , token, userDomain} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/category/new/${userDomain}`;
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
                activeCategoryItem: result,
                categoryListLoading: false
            }
        }).catch((error) => {
            return {
                activeCategoryItem: null,
                categoryListLoading: false,
                categoryListLoadError: error.message || error
            };
        });
};

export const saveCategory = async (itemToSave)=>{
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogApi/api/v1/Category`;
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
                saveCategoryResult: result,
                activeCategoryItem: itemToSave,
                categoryListLoading: false
            }
        }).catch((error) => {
            return {
                success: false,
                categoryListLoading: false,
                categoryListLoadError: error.message || error
            };
        });
};

export const deleteCategory = (categoryId) => {
    const {catalogApi , token} = getStore();
    const url = `${catalogApi}/catalogapi/api/v1/category/${categoryId}`;
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
                deleteCategoryResult: result,
                categoryListLoading: false
            }
        }).catch((error) => {
            return {
                deleteCategoryResult: false,
                categoryListLoading: false,
                deleteCategoryResultError: error.message || error
            };
        });
};