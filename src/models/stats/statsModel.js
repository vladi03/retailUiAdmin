import {createContext} from "../../utility/modelContext";
import {getHitReport} from "./statsMessage";
import {statToChart, hitConfigToChart} from "./statsToChart";
import {dateFormat} from "dateformat"
export const createModel = () => ({
    hitReport: [],
    hitChartData: [],
    hitReportLoaded: true,
    hitReportLoading: false,
    hitReportLoadError: false,
    hitReportInitDone: false,
    weekStartDate:'',
    weekEndDate:'',
    onHitReportInit,
    onHitReportGet,
    setWeekDays
});
let provider = null;

const onHitReportInit= async ()=> {
    provider.setState({hitReportInitDone: true});
    await onHitReportGet();
}
const setWeekDays =(hitReportArr)=>{
    const startWeek = new Date(hitReportArr[0].hitStart);
    const endWeek = new Date(hitReportArr[hitReportArr.length-1].hitStart);

    let sDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startWeek);
    let sMo = new Intl.DateTimeFormat('en', { month: 'short' }).format(startWeek);
    let eDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(endWeek);
    let eMo = new Intl.DateTimeFormat('en', { month: 'short' }).format(endWeek);
    provider.setState({weekStartDate:`${sMo} ${sDay}`, weekEndDate:`${eMo} ${eDay}`})

}

const onHitReportGet = async ()=> {
    provider.setState({hitReportLoading: true});
    const result = await getHitReport();
    console.log(result.hitReport)
    setWeekDays(result.hitReport)
    if(!result.hitReportLoadError)
        result.hitChartData =  statToChart(result.hitReport, hitConfigToChart);
    provider.setState(result);
}

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const statsModel = createContext(createModel, getInitialState);