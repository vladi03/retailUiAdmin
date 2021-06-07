
export const hitConfigToChart = {
    seriesName: "hits",
    labelField: "hitStart",
    dataField: "hitCount",
    labelConverter: (data) => {

        return data.substr(5, 5);
    }
}

export const statToChart = (dataList, config) => {
    let result = [];
    if(Array.isArray(dataList)){
        result = dataList.map((data) => ({
            name: config.labelConverter ? config.labelConverter(data[config.labelField]) : data[config.labelField],
            [config.seriesName] : data[config.dataField]
        }));
    }
    return result;
}