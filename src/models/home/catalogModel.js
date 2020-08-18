import {createContext} from "../../utility/modelContext";
import {getCatalogList} from "./catalogMessage";
import {saveCatalog} from "./catalogMessage";

let provider = null;

export const createModel = () => ({
    activeCatalogItem: null,
    catalogList: [],
    catalogListFiltered: [],
    catalogListLoading: false,
    catalogListInit: false,
    onCatalogListInit,
    onSetActiveCatalogItem,
    onSaveCatalogItem
});

const onSaveCatalogItem = async (activeCatalogItem) => {
    provider.setState({});
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
