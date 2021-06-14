import {createContext} from "../../utility/modelContext";
import {salesSearchByName} from "./salesSearchMessage";

export const createModel = () => ({
    salesSearch: {rowCountFound: 0, rows: [], items: []},
    salesSearchLoading: false,
    salesSearchLoadError: false,
    salesSearchLoaded: true,
    onGetSalesByName
});

let provider = null;

const onGetSalesByName = async (name) => {
    provider.setState({salesSearchLoading: true});
    const result = await salesSearchByName(name);
    provider.setState(result);
}

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const salesSearchModel = createContext(createModel, getInitialState);