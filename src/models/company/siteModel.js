import { createContext } from "../../utility/modelContext";
import  {getSiteParams, saveSite} from "./siteMessaage";

let provider = null;

// noinspection JSUnusedGlobalSymbols
export const createModel = () => ({
    site: {
        salesBackgroundColor: [0, 255, 255],
        salesFontColor: [0,0,0]
    },
    siteLoading: false,
    siteLoadError: "",
    siteDataInitialized: false,
    siteLoaded : false,
    siteHasError : false,
    siteMessage : "",
    siteLoadMessageDetail: "",
    onLoadSite,
    onSaveSiteColor,
    setSalesBackgroundColor,
    setSalesFontColor
});

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

const setSalesBackgroundColor = (salesBackgroundColor) =>
    provider.setState({site: {...provider.state.site, salesBackgroundColor}});

const setSalesFontColor = (salesFontColor) =>
    provider.setState({site: {...provider.state.site, salesFontColor}});

const onSaveSiteColor = (siteColor) => {
    provider.setState({ siteLoading: true });
    const origValue = provider.state.site;
    saveSite({...origValue,...siteColor});
}

const onLoadSite = () => {
    provider.setState({ siteLoading: true, siteDataInitialized : true });
    getSiteParams().then((result)=>{

        if(result.siteHasError === true)
            provider.setState({site: {...result.site,
                    salesBackgroundColor: provider.state.salesBackgroundColor,
                    salesFontColor: provider.state.salesFontColor,
            }});
        else
            provider.setState(result);
    })
};

export const siteModel = createContext(createModel, getInitialState);
export default siteModel;
