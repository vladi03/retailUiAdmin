import {createContext} from "../../utility/modelContext";
import {getCatalogList} from "./catalogMessage";

let provider = null;

export const createModel = () => ({
    catalogList: [],
    catalogListLoading: false,
    catalogListInit: false,
    onCatalogListInit
});

const onCatalogListInit = () => {
    provider.setState({catalogListInit: true});
    getCatalogList().then((newStat) => provider.setState(newStat));
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const catalogModel = createContext(createModel, getInitialState);
