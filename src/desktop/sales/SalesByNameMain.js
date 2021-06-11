import React from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {connectArray} from "../../utility/helpers";
import {salesSearchModel} from "../../models/sales/salesSearchModel";
import {Money, Search} from "@material-ui/icons";
import {IconButton, InputBase} from "@material-ui/core";
import {SpinnerDownloading} from "../../utility/components";

const SalesByNameMainComponent = ({onGetSalesByName, salesSearch, salesSearchLoading}) => {
    console.log(salesSearch);
    const titleCount = salesSearch && salesSearch.rowCountFound > 0 ?
        `${salesSearch.rowCountFound} Found`
        : "Enter Name and Click Search";

    return (
        <div>
            <AppBarTitleAddSearch
                title={`Sales Search By Name (${titleCount})`}
                LeftIcon={Money}
            />
            <SpinnerDownloading loading={salesSearchLoading}
                                spinnerSize={30}
            >
                <InputBase
                    placeholder="Search By Name"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton onClick={()=> onGetSalesByName("martinez")}>
                    <Search />
                </IconButton>
            </SpinnerDownloading>
        </div>
    )
}

export const SalesByNameMain = connectArray(SalesByNameMainComponent, [salesSearchModel]);