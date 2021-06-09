import {createContext} from "../../utility/modelContext";
import {getHitReport} from "./statsMessage";
import {statToChart, hitConfigToChart} from "./statsToChart";

export const createModel = () => ({
    hitReport: [],
    hitChartData: [],
    hitReportLoaded: true,
    hitReportLoading: false,
    hitReportLoadError: false,
    hitReportInitDone: false,
    onHitReportInit,
    onHitReportGet
});
let provider = null;

const onHitReportInit= async ()=> {
    provider.setState({hitReportInitDone: true});
    await onHitReportGet();
}

const onHitReportGet = async ()=> {
    provider.setState({hitReportLoading: true});
    const result = await getHitReport();
    if(!result.hitReportLoadError)
        result.hitChartData =  statToChart(result.hitReport, hitConfigToChart);
    provider.setState(result);
}

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const statsModel = createContext(createModel, getInitialState);