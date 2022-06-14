import {createContext} from "../../utility/modelContext";
import {salesHist} from "./salesSearchMessage";

export const createModel = () => ({
    "salesHist": {
        "rowCountFound": 0,
        "rows": [],
        "items": []
    },
    "salesHistLoading": false,
    "salesHistLoadError": false,
    "salesHistInitDone": false,
    onGetSalesHist,
    onSalesHistInit
});

let provider = null;

const onSalesHistInit= async ()=> {
    provider.setState({salesHistInitDone: true});
    await onGetSalesHist();
}

const onGetSalesHist = async () => {
    provider.setState({salesHistLoading: true});
    const result = await salesHist();

    provider.setState(result);
}

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const salesHistModel = createContext(createModel, getInitialState);