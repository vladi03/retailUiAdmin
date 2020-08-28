import {createContext} from "../../utility/modelContext";
import {getCatalogList} from "./catalogMessage";
import {saveCatalog, uploadImage} from "./catalogMessage";

let provider = null;

export const createModel = () => ({
    activeCatalogItem: null,
    catalogList: [],
    catalogListFiltered: [],
    catalogListLoading: false,
    catalogListInit: false,
    onCatalogListInit,
    onSetActiveCatalogItem,
    onSaveCatalogItem,
    onUploadImage
});

const onUploadImage = async (imageToSave) => {
    return await uploadImage(imageToSave);
};

const onSaveCatalogItem = async (itemEdit, uploadImageMetadata, willFitWidth, colorRgb) => {

    provider.setState({catalogListLoading: true});
    const fileShowing = {...uploadImageMetadata, willFitWidth, colorRgb};
    const search = itemEdit.images.find((im)=> im.id === fileShowing.id);
    const images = itemEdit.images && itemEdit.images.length > 1 && search ?
        itemEdit.images.map((im) => {
            return im.id === fileShowing.id ? fileShowing : im;
        }) : [fileShowing];

    const activeCatalogItem = {...itemEdit, images};

    const result = await saveCatalog(activeCatalogItem);

    if(result.saveCatalogResult && result.saveCatalogResult.modifiedCount > 0) {
        result.catalogList = provider.state.catalogList.map((ct) => {
            return ct._id === activeCatalogItem._id ? activeCatalogItem : ct;
        });
        result.catalogListFiltered = result.catalogList;
    }
    provider.setState(result);
};

const onSetActiveCatalogItem = (activeCatalogItem) => {
    provider.setState({activeCatalogItem});
};

const onCatalogListInit = () => {
    provider.setState({catalogListInit: true});
    getCatalogList().then((newState) => {
            newState.catalogListFiltered = newState.catalogList;
            provider.setState(newState);
        }
    );
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const catalogModel = createContext(createModel, getInitialState);
