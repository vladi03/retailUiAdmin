import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Paper} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {CatalogItemEdit} from "./CatalogItemEdit";
import {useIsMobile} from "../../utility/useIsMobile";
import {CategorySelect} from "./CategorySelect";
import {PopupError} from "../../utility/components/PopupError";
import {Accordion,AccordionDetails,AccordionSummary, GridList,GridListTile } from '@material-ui/core';
import {categoryModel} from "../../models/home/categoryModel";
import {CatalogList} from "./CatalogListComponent";

export const CatalogTableComponent = ({catalogList,catalogListFiltered,
                                          catalogListInit, onCatalogListInit, onAddCategoryToCatalog,
                                          onRemoveCategoryFromCatalog, onSetActiveCatalogItem, activeCatalogItem,
                                          onSetCatalogStatus, catalogStatusLoading, onCategorySelectChange,
                                          onCatalogOrderChange, savingCatalogSort, catalogListLoadError,
                                          onClearCatalogError, categoryList, catalogListOutCategory  }) => {

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
                                           className={classes.accordion}

                                >
                                    <AccordionSummary>
                                        {category.category}
                                    </AccordionSummary>

                                    <CatalogList  />


                                </Accordion>

                            )

                        })
                        }
                   


                    </div>

                    <div className={classes.gridListContainer} >
                        <Paper className={classes.gridListBottom}>
                            
                        {catalogListOutCategory.map((catalog, index)=> {

                            const prevCatalog = index > 0 ?
                                catalogListFiltered[index - 1] : null;

                            const nextCatalog =
                                catalogListFiltered.length > (index - 2) ?
                                    catalogListFiltered[index + 1] : null;

                            const filterCategory = categorySelected && nextCatalog && nextCatalog.categories.filter(
                                (cat) => cat._id === categorySelected._id ) || [];


                            const nextIsInCategory = filterCategory.length > 0;
                            return(
                                <GridListTile>
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
                            </GridListTile>
                                    );
                            }
                            )}

                    
                                    </Paper>
                                    



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
        display:"block",
        flexWrap:"wrap",
        justifyContent: "space-between",
        width:  "100%",

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
    },
    gridList: {
        flexWrap: 'wrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      gridListBottom: {
        flexWrap: 'nowrap',
        bottom:0,
        position:'absolute',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        display:'flex',      
        width: '100%',
        overflow: 'scroll'  

      },
      gridListTile:{
          

      },
      accordion:{
          height:'100%'
      },
      catalogListComponent: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width:  "100%",
        overflow:'hidden'
        

      },
});