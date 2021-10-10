import React, {useState} from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {connectArray} from "../../utility/helpers";
import {salesSearchModel} from "../../models/sales/salesSearchModel";
import {Money, Search} from "@material-ui/icons";
import {IconButton, InputBase, Paper, Divider, InputLabel,
    Button, ButtonGroup} from "@material-ui/core";
import {SpinnerDownloading} from "../../utility/components";
import {makeStyles} from "@material-ui/core/styles";
import {TablePaging} from "table-page-search";

const headerConfig = {
    key: "0",
    itemsPerPage: 10,
    defaultSort: "1",
    sortDescending: true,
    columns: [
        {fieldForSort: "ticketNum", columnLabel: "TIX NO"},
        { fieldForSort: "day", columnLabel: "Day"
        },
        { fieldForSort: "month", columnLabel: "Month"
        },
        { fieldForSort: "name", columnLabel: "Name" },
        { fieldForSort: "price", columnLabel: "Price" }
    ]
};

const SalesByNameMainComponent = ({onGetSalesByName, salesSearch, salesSearchLoading}) => {
    console.log(salesSearch);
    const titleCount = salesSearch && salesSearch.rowCountFound > 0 ?
        `${salesSearch.rowCountFound} Found`
        : "Enter Name and Click Search";
    const classes = useStyles();
    const dataLoaded = salesSearch.items.length > 0;
    const [searchText, setSearchText] = useState("");
    const [filterTable, setFilterTable] = useState("");
    const [location, setLocation] = useState(localStorage.getItem('salesLocation') || "JO");

    return (
        <div>
            <AppBarTitleAddSearch
                title={`Sales Search By Name (${titleCount})`}
                LeftIcon={Money}
            />
            <div style={{display:"flex"}}>
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
                            (event)=> setSearchText(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.keyCode === 13) {
                                onGetSalesByName(searchText, location)
                            }
                        }}
                    />
                    <IconButton onClick={()=> onGetSalesByName(searchText, location)}

                    >
                        <Search />
                    </IconButton>
                </SpinnerDownloading>
            </Paper>
                <ButtonGroup size="small" color="secondary" aria-label="small outlined button group"
                style={{marginRight: 20}}>
                    <Button
                        style={{background: location === "JO" ? "aliceblue" : ""}}
                        onClick={() => {
                            localStorage.setItem("salesLocation", 'JO');
                            setLocation("JO");
                        }}
                    >
                        Jonesboro
                    </Button>
                    <Button
                        style={{background: location === "GR" ? "aliceblue" : ""}}
                        onClick={() => {
                            localStorage.setItem("salesLocation", 'GR');
                            setLocation("GR");
                        }}
                    >
                        Griffin
                    </Button>
                </ButtonGroup>
            {dataLoaded &&
            <Paper className={classes.filterRoot}>
                <InputLabel className={classes.searchLabel}>Filter Table Results</InputLabel>
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    placeholder="Filter By Month/Year/Name"
                    inputProps={{'aria-label': 'search google maps'}}
                    value={filterTable}
                    onChange={
                        (event) => setFilterTable(event.target.value)
                    }

                />
            </Paper>
            }
            </div>
            <TablePaging  loading={salesSearchLoading}
                          dataList={salesSearch.items}
                          headerConfig={headerConfig}
                          filterText={filterTable}
            />
        </div>
    )
};

export const SalesByNameMain = connectArray(SalesByNameMainComponent, [salesSearchModel]);

const useStyles = makeStyles({
    searchButtonRoot : {
        paddingLeft: 15,
        paddingRight: 0,
        width: 265,
        marginRight: 20
    },
    filterRoot : {
        paddingLeft: 15,
        paddingRight: 0,
        width: 450,
        display: "flex"
    },
    spinnerWrapper : {
        marginTop: 10,
        marginBottom: 10
    },
    divider: {
        height: 28,
        margin: 4,
        paddingTop: 15,
        marginLeft : 10,
        marginRight: 10
    },
    searchLabel: {
        paddingTop: 15
    }
})