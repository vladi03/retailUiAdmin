import {createContext} from "../../utility/modelContext";
import {getCatalogList} from "./catalogMessage";

let provider = null;

export const createModel = () => ({
    catalogList: [],
    catalogListFiltered: [],
    catalogListLoading: false,
    catalogListInit: false,
    onCatalogListInit
});

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
