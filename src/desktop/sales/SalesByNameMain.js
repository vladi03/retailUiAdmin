import React, {useState} from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {connectArray} from "../../utility/helpers";
import {salesSearchModel} from "../../models/sales/salesSearchModel";
import {Money, Search} from "@material-ui/icons";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import {SpinnerDownloading} from "../../utility/components";
import {makeStyles} from "@material-ui/core/styles";
import {TablePaging} from "table-page-search";

const headerConfig = {
    key: "0",
    itemsPerPage: 10,
    defaultSort: "1",
    sortDescending: true,
    columns: [
        { fieldForSort: "0", columnLabel: "Day",
            display: (row)=> `${row[0].substr(5)}`
        },
        { fieldForSort: "1", columnLabel: "Month",
            display: (row)=>
                `${row[1].substr(10).replace(/%20/g," ").replace(".xlsx","")}`
        },
        { fieldForSort: "4", columnLabel: "Name" },
        { fieldForSort: "5", columnLabel: "Price" }
    ]
};

const SalesByNameMainComponent = ({onGetSalesByName, salesSearch, salesSearchLoading}) => {
    console.log(salesSearch);
    const titleCount = salesSearch && salesSearch.rowCountFound > 0 ?
        `${salesSearch.rowCountFound} Found`
        : "Enter Name and Click Search";
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    return (
        <div>
            <AppBarTitleAddSearch
                title={`Sales Search By Name (${titleCount})`}
                LeftIcon={Money}
            />
            <Paper className={classes.searchButtonRoot}>
                <SpinnerDownloading loading={salesSearchLoading}
                                    spinnerSize={30}
                                    classes={{spinnerWrapper: classes.spinnerWrapper }}
                >
                    <InputBase
                        placeholder="Search By Name"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={searchText}
                        onChange={
                            (event)=> setSearchText((event.target.value))}
                        onKeyUp={(event) => {
                            if (event.keyCode === 13) {
                                onGetSalesByName(searchText)
                            }
                        }}
                    />
                    <IconButton onClick={()=> onGetSalesByName(searchText)}

                    >
                        <Search />
                    </IconButton>
                </SpinnerDownloading>
            </Paper>
            <TablePaging  loading={salesSearchLoading}
                          dataList={salesSearch.rows}
                          headerConfig={headerConfig}
            />
        </div>
    )
}

export const SalesByNameMain = connectArray(SalesByNameMainComponent, [salesSearchModel]);

const useStyles = makeStyles({
    searchButtonRoot : {
        paddingLeft: 15,
        paddingRight: 0,
        width: 250
    },
    spinnerWrapper : {
        marginTop: 10,
        marginBottom: 10
    }
})