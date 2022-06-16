import React, {useEffect, useState} from "react";
import {TablePaging} from "table-page-search";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {BorderAll} from "@material-ui/icons";
import {salesHistModel} from "../../models/sales/salesHistModel";
import {connectArray} from "../../utility/helpers";


const headerConfig = {
    key: "0",
    itemsPerPage: 10,
    defaultSort: "runDate._seconds",
    sortDescending: true,
    columns: [
        { fieldForSort: "fileName", columnLabel: "File"},
        {
            display: (row, columnConfig, onRowClick)=> new Date(row.runDate._seconds * 1000).toDateString()
            , columnLabel: "Date" },
        { fieldForSort: "count", columnLabel: "Count" }
    ]
};

const SalesHistMainComponent = ({salesHist, onGetSalesHist, salesHistLoading, salesHistLoadError,
                                    salesHistInitDone, onSalesHistInit}) => {
    useEffect(()=> {
        if(!salesHistInitDone)
            onSalesHistInit();
    });

    const [searchText, setSearchText] = useState("");

    return (
        <div>
            <AppBarTitleAddSearch
                title={`Sales Hist`}
                LeftIcon={BorderAll}
                onSearchChange={setSearchText}
            />
            <TablePaging  loading={salesHistLoading}
                          dataList={salesHist.items}
                          headerConfig={headerConfig}
                          filterText={searchText}
            />
        </div>
    )
}

export const SalesHistMain = connectArray(SalesHistMainComponent, [salesHistModel]);
