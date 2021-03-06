import {createContext} from "../../utility/modelContext";
import {saveCategory, getCategoryList,
    getNewCategory, deleteCategory} from "./categoryMessage";

let provider = null;

export const createModel = () => ({
    activeCategoryItem: null,
    categoryList: [],
    categoryListLoading: false,
    categoryListInit: false,
    onCategoryListInit,
    onSetActiveCategoryItem,
    onSaveCategoryItem,
    onCreateNewCategory,
    onDeleteCategory
});

const onCategoryListInit = () => {
    provider.setState({categoryListInit: true});
    getCategoryList().then((newState) => {
        provider.setState(newState);
    });
};

const onSetActiveCategoryItem = (activeCategoryItem) => {
    provider.setState({activeCategoryItem});
};

const onSaveCategoryItem = async (itemToSave) => {
    if(itemToSave.isNew)
        delete itemToSave.isNew;
    const result = saveCategory(itemToSave);
    result.categoryList = provider.state.categoryList.map((cat) =>
        cat._id === itemToSave._id ? itemToSave : cat);

    provider.setState(result);
};

const onCreateNewCategory = async () => {
    provider.setState({categoryListInit: true});
    const result = await getNewCategory();

    result.categoryList = [result.activeCategoryItem, ...provider.state.categoryList,
        ];

    provider.setState(result);
};

const onDeleteCategory = async (category) => {
    provider.setState({categoryListLoading: true});
    const result = await deleteCategory(category._id);

    result.categoryList = provider.state.categoryList.filter(
        (cat) => cat._id !== category._id
    );

    result.activeCategoryItem = null;
    provider.setState(result);
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const categoryModel = createContext(createModel, getInitialState);
