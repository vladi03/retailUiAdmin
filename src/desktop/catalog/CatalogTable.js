import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {CatalogItemEdit} from "./CatalogItemEdit";
import {useIsMobile} from "../../utility/useIsMobile";
import {CategorySelect} from "./CategorySelect";
import {PopupError} from "../../utility/components/PopupError";
import {Accordion,AccordionDetails,AccordionSummary } from '@material-ui/core';
import {categoryModel} from "../../models/home/categoryModel";

export const CatalogTableComponent = ({catalogList,catalogListFiltered,
                                          catalogListInit, onCatalogListInit, onAddCategoryToCatalog,
                                          onRemoveCategoryFromCatalog, onSetActiveCatalogItem, activeCatalogItem,
                                          onSetCatalogStatus, catalogStatusLoading, onCategorySelectChange,
                                          onCatalogOrderChange, savingCatalogSort, catalogListLoadError,
                                          onClearCatalogError,categoryList}) => {

    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });

    const isMobile = useIsMobile();
    const [categorySelected, setCategorySelected] = useState({_id:null, category: "All"});

    const inEdit = activeCatalogItem !== null;
    const classes = useStyle({inEdit});

    return (
        <Fragment>
            <PopupError
                errorMessage={catalogListLoadError && "Error Saving"}
                onClearErrorMessage={() => onClearCatalogError(false)}
                status={"error"}
            />

            <div style={{width: 360, marginTop: -10, marginBottom: 10}}>
                <CategorySelect
                    onChange={(category) => {
                        setCategorySelected(category);
                        onCategorySelectChange(category);
                    }}
                />
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.scrollContainer}>
                    <div className={classes.container}>

                        {categoryList.map((category, index) => {
                            {console.log(category, )}
                            return(

                                <Accordion expanded={category._id===categorySelected._id}
                                           onChange={() => {

                                               if(category._id===categorySelected._id){
                                                   const emptyCat = {_id:null, category: "All"}
                                                   setCategorySelected(emptyCat);
                                                   onCategorySelectChange(emptyCat);


                                               }else {
                                                   setCategorySelected(category);
                                                   onCategorySelectChange(category);
                                               }
                                               //setTableList(onSelectCategory(category))
                                           }}
                                           key={category._id}
                                           style={{width:'100vw'}}

                                >
                                    <AccordionSummary>
                                        {category.category}

                                    </AccordionSummary>

                                    <div style={{display:'flex', flexDirection:'row',overflowX: 'scroll'}}>



                                        {catalogListFiltered.map((catalog, index)=> {
                                                console.log(catalog, catalog.status,catalog.status === "active")

                                                const prevCatalog = index > 0 ?
                                                    catalogListFiltered[index - 1] : null;

                                                const nextCatalog =
                                                    catalogListFiltered.length > (index - 2) ?
                                                        catalogListFiltered[index + 1] : null;

                                                const filterCategory = categorySelected && nextCatalog && nextCatalog.categories.filter(
                                                    (cat) => cat._id === categorySelected._id ) || [];

                                                const nextIsInCategory = filterCategory.length > 0;

                                                return (
                                                    <div>

                                                        {(catalog.status === "active" ?
                                                            <div >
                                                                Active
                                                                <CatalogCard
                                                                    key={`${catalog._id}${catalog.sort}`}
                                                                    prevCatalog={prevCatalog}
                                                                    nextCatalog={nextIsInCategory ? nextCatalog : null}
                                                                    inEdit={inEdit}
                                                                    catalog={catalog}
                                                                    category={categorySelected}
                                                                    disableEdit={activeCatalogItem != null}
                                                                    onSetStatus={onSetCatalogStatus}
                                                                    onAddCategory={onAddCategoryToCatalog}
                                                                    onRemoveCategory={onRemoveCategoryFromCatalog}
                                                                    isSaving={catalog._id === catalogStatusLoading}
                                                                    onOrderChange={onCatalogOrderChange}
                                                                    savingCatalogSort={savingCatalogSort}
                                                                    onClick={() => {
                                                                        if (!isMobile) {
                                                                            onSetActiveCatalogItem(catalog);
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            :null)}
                                                        {(catalog.status === "in-progress" ?
                                                            <>
                                                                <CatalogCard
                                                                    key={`${catalog._id}${catalog.sort}`}
                                                                    prevCatalog={prevCatalog}
                                                                    nextCatalog={nextIsInCategory ? nextCatalog : null}
                                                                    inEdit={inEdit}
                                                                    catalog={catalog}
                                                                    category={categorySelected}
                                                                    disableEdit={activeCatalogItem != null}
                                                                    onSetStatus={onSetCatalogStatus}
                                                                    onAddCategory={onAddCategoryToCatalog}
                                                                    onRemoveCategory={onRemoveCategoryFromCatalog}
                                                                    isSaving={catalog._id === catalogStatusLoading}
                                                                    onOrderChange={onCatalogOrderChange}
                                                                    savingCatalogSort={savingCatalogSort}
                                                                    onClick={() => {
                                                                        if (!isMobile) {
                                                                            onSetActiveCatalogItem(catalog);
                                                                        }
                                                                    }}
                                                                />
                                                            </>
                                                            :null)}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </Accordion>
                            )

                        })
                        }
                    </div>
                </div>
                {inEdit &&
                <div className={classes.containerEdit}>
                    <div style={{width: "100%"}}>
                        <IconButton
                            className={classes.editControl}
                            onClick={()=> {
                                onSetActiveCatalogItem(null);
                            }}
                        >
                            <Close/>
                        </IconButton>
                    </div>
                    <CatalogItemEdit />
                </div>
                }

            </div>
        </Fragment>
    )
};

export const CatalogTable = connectArray(CatalogTableComponent,[catalogModel, categoryModel]);

const useStyle = makeStyles({
    scrollContainer: {
        height: "calc( 100vh - 120px)",
        width: props => props.inEdit ? "24vw" : "100%",
        overflow: "auto",
    },
    container: {
        display:"flex",
        flexWrap:"wrap",
        justifyContent: "space-between",
        width:  "100vw"
    },
    containerEdit: {
        display:"flex",
        flexWrap:"wrap",
        justifyContent: "flex-start",
        height: 80,
        width: "calc( 75vw - 87px)"
    },
    editControl: {
        position: "absolute",
        right: 10,
        //top: 90,
        zIndex: 999
    },
    mainContainer: {
        display:"flex",
        flexWrap:"wrap",
    }
});