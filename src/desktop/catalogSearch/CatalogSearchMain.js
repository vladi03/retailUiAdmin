import React, {useEffect, useState} from "react";
import XLSX, {utils} from  "xlsx";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {Button, FormControlLabel, Switch, Paper} from "@material-ui/core";
import {TableChart} from "@material-ui/icons";
import {catalogExportFields, catalogTableConfig} from "../../models/home/catalogXlExport";
import {convertToSheetArray, createFilterOptions} from "../../utility/helpers";
import {SpinnerDownloading} from "../../utility/components";
import {TablePaging} from "table-page-search";
import {catalogSelectOptions} from "../../models/home/catalogXlExport";
import {getItemPropertyValue} from "../../utility/helpers";
import {makeStyles} from "@material-ui/core/styles";

const CatalogSearchMainComponent = ({catalogList, catalogListInit,
              onCatalogListInit, catalogListLoading}) => {
    useEffect(()=> {
        if(!catalogListInit) {
            onCatalogListInit();
        } else if(catalogFiltered === null && !catalogListLoading) {
            setCatalogFiltered(catalogList);
            const options = createFilterOptions(catalogSelectOptions,
                catalogList);
            setFilterOptions(options);
        }
    });
    const [catalogFiltered, setCatalogFiltered]= useState(null);
    const [filterOptions, setFilterOptions]= useState(null);

    console.log(filterOptions);

    const onFilterOptionToggle = (fieldName, optionValue, isSelected) => {
        const newFilterOptions = {
            fieldList: filterOptions.fieldList
        };

        const filterSets = {};

        filterOptions.fieldList.forEach((fieldRef) => {
            filterSets[fieldRef.fieldName] = [];
            newFilterOptions[fieldRef.fieldName] =
                filterOptions[fieldRef.fieldName].map(
                    (optionRef) => optionRef.option ===  optionValue ?
                        {option : optionValue, selected: isSelected} :
                        optionRef
                );
            newFilterOptions[fieldRef.fieldName].forEach((optionRef) => {
                if(optionRef.selected)
                    filterSets[fieldRef.fieldName].push(optionRef.option);
            });
        });

        const newCatalogFiltered = catalogList.filter((catalog)=>{
            let isIncluded = true;
            newFilterOptions.fieldList.forEach((fieldRef) => {
                const catalogValue = getItemPropertyValue(catalog, fieldRef.fieldName);
                if(filterSets[fieldRef.fieldName].length > 0 && filterSets[fieldRef.fieldName].indexOf(catalogValue) === -1)
                    isIncluded = false;
            });
            return isIncluded;
        })
        setFilterOptions(newFilterOptions);
        setCatalogFiltered(newCatalogFiltered);
    };
    const classes = useStyle();
    return (
        catalogFiltered === null ?
            <SpinnerDownloading
                spinnerSize={60}
                style={{paddingTop: "25vh"}}
            /> :
        <div>
            Total Records : {catalogFiltered && catalogFiltered.length}
            {filterOptions && <div>
                {filterOptions.fieldList.map((fieldRef)=> {

                    return (
                        <Paper className={classes.filterContainer}>
                        <div key={fieldRef.fieldName} style={{display: "flex"}}>
                            {fieldRef.columnLabel} :
                            {filterOptions[fieldRef.fieldName].map(
                                (optionRef) => {

                                    return (
                                        <div key={optionRef.option}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={optionRef.selected}
                                                        onChange={(event)=> {
                                                            onFilterOptionToggle(fieldRef.fieldName, optionRef.option, event.target.checked);
                                                        }}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                }
                                                label={optionRef.option}
                                                style={{marginLeft: 3, marginRight: 0}}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        </Paper>
                    );
                })}
            </div>
            }
            <TablePaging
                dataList={catalogFiltered}
                headerConfig={catalogTableConfig}
            />
            <Button
                startIcon={<TableChart />}
                style={{marginRight: 20, marginTop: 20}}
                variant="contained"
                color="primary"
                onClick={() => {
                    const data = convertToSheetArray(catalogFiltered, catalogExportFields);
                    /* convert from array of arrays to workbook */
                    const worksheet = utils.aoa_to_sheet(data);
                    const new_workbook = utils.book_new();
                    utils.book_append_sheet(new_workbook, worksheet, "Catalog");

                    XLSX.writeFile(new_workbook, 'catalog.xlsx');
                }}
            >
                Export
            </Button>
        </div>
    );
};

export const CatalogSearchMain = connectArray(CatalogSearchMainComponent,
    [catalogModel]);

const useStyle = makeStyles({
    filterContainer : {
        margin: 10,
        padding: 10
    }
})


