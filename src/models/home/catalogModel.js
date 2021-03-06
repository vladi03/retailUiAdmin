import {createContext} from "../../utility/modelContext";
import {saveCatalog, uploadImage, deleteFile, saveCatalogStatus,
    getNewCatalog, deleteCatalog, getCatalogList} from "./catalogMessage";
import {sortCatalog, swapOrder, filterCatalog,
    filterCatalogNoCategory,getCatalogTotals, getNextSortInCategory} from "./catalogHelper";
import {showError} from "../../utility/helpers";

let provider = null;

export const createModel = () => ({
    activeCatalogItem: null,
    catalogList: [],
    catalogListFiltered: [],
    catalogListOutCategory:[],
    catalogListNoCategory:[],
    catalogTotals:[],


    catalogListLoading: false,
    catalogListLoadError: false,
    savingCatalogSort: false,
    catalogListInit: false,
    catalogStatusLoading:false,
    categorySelected: null,
    catalogSearchText: "",
    imageUploading: false,
    onCatalogListInit,
    onSetActiveCatalogItem,
    onSaveCatalogItem,
    onUploadImage,
    onCreateNewCatalog,
    onDeleteCatalog,
    onSetCatalogStatus,
    onAddCategoryToCatalog,
    onRemoveCategoryFromCatalog,
    onCategorySelectChange,
    onCatalogOrderChange,
    onCatalogSearch,
    onClearCatalogError,
    onSetCatalogTotals,
    getCatalogCategorySort
});

const onClearCatalogError = ()=>{
    provider.setState({catalogListLoadError: false});
};

const getCatalogCategorySort = (categoryId) => {
    const {catalogList} = provider.state;
    return getNextSortInCategory(categoryId, catalogList);
};

const onCatalogSearch = (catalogSearchText) => {
    const searchText = catalogSearchText.toLowerCase();
    const catalogListFilteredTemp = provider.state
        .catalogList.filter((cat) =>
            cat.shortDesc.toLowerCase().indexOf(searchText) > -1 ||
            cat.modelNumber.toLowerCase().indexOf(searchText) > -1
        );
    const catalogListFiltered = sortCatalog(catalogListFilteredTemp,
        provider.state.categorySelected &&
        provider.state.categorySelected._id);

    provider.setState({catalogSearchText, catalogListFiltered});
};

const onCatalogOrderChange = async (catalog, category, swapCatalog) => {
    try {
        provider.setState({savingCatalogSort: true});
        const {target, swap} = swapOrder(catalog,category, swapCatalog);

        await commonSaveCatalogItem(target, false);
        await commonSaveCatalogItem(swap, false);
    } catch (ex) {

    }
    provider.setState({savingCatalogSort: false});
};

//category select drop down
const onCategorySelectChange = (categorySelected) => {
    const result = setCategorySelectedCommon(categorySelected,
        provider.state.catalogList);
    provider.setState(result);
};

const setCategorySelectedCommon = (categorySelected, catalogList) => {
    const catalogListSorted = sortCatalog(catalogList,
        categorySelected._id);

    const {filterCatalogIn,filterCatalogOut } = filterCatalog(catalogListSorted,categorySelected._id );
    const catalogListNoCategory = filterCatalogNoCategory(catalogListSorted);

    return {
        catalogListFiltered:filterCatalogIn,
        catalogListOutCategory:filterCatalogOut,
        categorySelected,
        catalogListNoCategory
    };
};

const onAddCategoryToCatalog = async ({catalog, category}) => {
    let maxSort = 1;

    provider.state.catalogList.forEach((cat) => {
        const searchCate = cat.categories.filter((cate)=> {
            return cate._id === category._id;
        });
        if(searchCate.length > 0 && searchCate[0].sort > maxSort)
            maxSort = searchCate[0].sort;
    });

    provider.setState({
            "catalogStatusLoading": catalog._id,
            "catalogListLoading": true
        });

    const newCatalog = {...catalog,
        categories : [
            {...category, sort: (maxSort + 1)},
            ...catalog.categories]
    };

    await commonSaveCatalogItem(newCatalog, false);
};

const onRemoveCategoryFromCatalog = async ({catalog, categoryId}) => {
    provider.setState(
        {"catalogStatusLoading": catalog._id,
        catalogListLoading: true});
    const categories = catalog.categories.filter(
        (cat) => cat._id !== categoryId);
    const newCatalog = {...catalog, categories};
    await commonSaveCatalogItem(newCatalog, false);
};

const onSetCatalogStatus = async (status, id) => {
    provider.setState({"catalogStatusLoading": id, activeCatalogItem: null});

    const {saveCatalogStatusResult, catalogListLoadError,
        success} = await saveCatalogStatus(status, id);
    // noinspection JSUnresolvedVariable
    if(success && saveCatalogStatusResult.modifiedCount > 0) {
        const catalogList = provider.state.catalogList
            .map((catalog)=> {
                if(catalog._id === id) {
                    return {...catalog, status};
                } else
                    return catalog;
            });
        //change here
        const {
            catalogListFiltered,
            catalogListOutCategory,
            categorySelected,
            catalogListNoCategory} =
            setCategorySelectedCommon(provider.state.categorySelected,
                catalogList);

        /*
        const catalogListFiltered = sortCatalog(catalogList,
            provider.state.categorySelected &&
            provider.state.categorySelected._id);
*/
        provider.setState({
            catalogList,
            catalogListFiltered,
            catalogListOutCategory,
            categorySelected,
            catalogStatusLoading: false,
            catalogListLoadError,
            catalogListNoCategory
        });
    } else
        provider.setState({"catalogStatusLoading": false, catalogListLoadError});
};

const onDeleteCatalog = async (catalog) => {
    provider.setState({catalogListLoading: true});
    const result = await deleteCatalog(catalog);

    result.catalogList = provider.state.catalogList.filter(
        (cat) => cat._id !== catalog._id
    );
    result.catalogListFiltered = sortCatalog(result.catalogList,
        provider.state.categorySelected &&
        provider.state.categorySelected._id);
    result.activeCatalogItem = null;
    provider.setState(result);
};

const onUploadImage = async (imageToSave, oldFileId) => {
    provider.setState({imageUploading: true});
    if(oldFileId)
        await deleteFile(oldFileId);
    const result = await uploadImage(imageToSave, 540); //800
    provider.setState({imageUploading: false});
    return result;
};

const onCreateNewCatalog = async ()=> {
    provider.setState({catalogListInit: true});
    const result = await getNewCatalog();
    provider.setState(result);
};

const onSaveCatalogItem = async (itemEdit, uploadImageMetadata, willFitWidth, colorRgb, colorRgbOther) => {

    if(uploadImageMetadata && uploadImageMetadata.id &&
        uploadImageMetadata.id.length > 0 ) {
        provider.setState({catalogListLoading: true});
        const fileShowing = {...uploadImageMetadata, willFitWidth, colorRgb, colorRgbOther};
        const search = itemEdit.images && itemEdit.images.find((im) => im.id === fileShowing.id);
        const images = itemEdit.images && itemEdit.images.length > 1 && search ?
            itemEdit.images.map((im) => {
                return im.id === fileShowing.id ? fileShowing : im;
            }) : [fileShowing];

        const activeCatalogItem = {...itemEdit, images};
        await commonSaveCatalogItem(activeCatalogItem);
    } else {
        showError("Select a picture before saving");
    }
};

const commonSaveCatalogItem = async (activeCatalogItem, setActiveItem = true) => {
    const result = await saveCatalog(activeCatalogItem);

    // noinspection JSUnresolvedVariable
    if(result.saveCatalogResult && result.saveCatalogResult.modifiedCount > 0) {
        result.catalogList = provider.state.catalogList.map((ct) => {
            return ct._id === activeCatalogItem._id ? activeCatalogItem : ct;
        });

    } else { // noinspection JSUnresolvedVariable
        if(result.saveCatalogResult &&
                result.saveCatalogResult.upsertedCount > 0) {
                result.catalogList = [
                    ...provider.state.catalogList, activeCatalogItem
                ];
/*
                result.catalogListFiltered = sortCatalog(result.catalogList,
                    provider.state.categorySelected &&
                    provider.state.categorySelected._id);
                    */
            }
    }

    const {
        catalogListFiltered,
        catalogListOutCategory,
        categorySelected,
        catalogListNoCategory} =
        setCategorySelectedCommon(provider.state.categorySelected,
            result.catalogList);

    result.catalogListFiltered = catalogListFiltered;
    result.categorySelected = categorySelected;
    result.catalogListOutCategory = catalogListOutCategory;
    result.catalogListNoCategory = catalogListNoCategory;

    if(!setActiveItem)
        result.activeCatalogItem = null;
    result.catalogStatusLoading = false;
    //debugger;
    provider.setState(result);
};

const onSetActiveCatalogItem = (activeCatalogItem) => {
    provider.setState({activeCatalogItem});
};

const onCatalogListInit = () => {
    provider.setState({catalogListInit: true});
    getCatalogList().then((newState) => {
            // noinspection JSUndefinedPropertyAssignment
            newState.catalogListFiltered = newState.catalogList;
            provider.setState(newState);
        }
    );

};

const onSetCatalogTotals = (categoryList,catalogList) =>{
    const catalogTotals=getCatalogTotals(catalogList, categoryList);
    provider.setState({catalogTotals});
    console.log(catalogTotals);

};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const catalogModel = createContext(createModel, getInitialState);
