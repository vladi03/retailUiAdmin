import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Button, IconButton, Paper, Typography} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {CatalogItemEdit} from "./CatalogItemEdit";
import {useIsMobile} from "../../utility/useIsMobile";
import {CategorySelect} from "./CategorySelect";
import {PopupError} from "../../utility/components/PopupError";
import {Accordion, GridList,GridListTile } from '@material-ui/core';
import {categoryModel} from "../../models/home/categoryModel";
import {CatalogList} from "./CatalogListComponent";
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CatalogItemIcon} from "../SiteIcons";

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    }
}))(MuiAccordionDetails);
const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
        alignItems:'center'
    },
    expanded: {},
})(MuiAccordionSummary);
export const CatalogTableComponent = ({catalogList,catalogListFiltered,catalogTotals,onSetCatalogTotals,
                                          catalogListInit, onCatalogListInit, onAddCategoryToCatalog,
                                          onRemoveCategoryFromCatalog, onSetActiveCatalogItem, activeCatalogItem,
                                          onSetCatalogStatus, catalogStatusLoading, onCategorySelectChange,
                                          onCatalogOrderChange, savingCatalogSort, catalogListLoadError,
                                          onClearCatalogError, categoryList, catalogListOutCategory  }) => {

    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });
    useEffect(()=> {
        if(catalogTotals.length===0)
            onSetCatalogTotals(categoryList,catalogList);
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
                           const totals= catalogTotals ? catalogTotals.filter((aItem) =>
                                aItem._id === category._id) : [];
                            return(

                            <Accordion expanded={category._id === categorySelected._id}

                                       onMouseUp={()=>{

                                           if (category._id === categorySelected._id) {
                                               const emptyCat = {_id: null, category: "All"};
                                               setCategorySelected(emptyCat);
                                               onCategorySelectChange(emptyCat);
                                           } else {
                                               setCategorySelected(category);
                                               onCategorySelectChange(category);
                                           }
                                       }}
                                       key={category._id}
                                       className={classes.accordion}
                                       hidden={categorySelected && categorySelected._id && category._id !== categorySelected._id}

                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                >
                                    <CatalogItemIcon />
                                    <Typography className={classes.categoryTitle}>
                                       {category.category}
                                    </Typography>
                                    {!inEdit&&
                                        <>
                                    {
                                        totals.length > 0 &&
                                            <Typography style={{marginRight: '10%', position: 'absolute', right: 30}}>
                                                Active: {totals[0].activeTotal} Disabled: {totals[0].disabledTotal} Total: {totals[0].disabledTotal + totals[0].activeTotal}
                                            </Typography>
                                    }
                                    {category._id === categorySelected._id ?
                                        <>
                                        <Button variant="contained"
                                        color="primary"
                                        className={classes.reorderButton}>
                                        Reorder Items</Button>
                                        </> : null}
                                        </>
                                    }


                                </AccordionSummary>
                                <AccordionDetails>

                                    <CatalogList/>
                                </AccordionDetails>

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
    accordionDetails:{
        '&$expanded': {
            minHeight: 56,
        },
    },
      reorderButton: {
        margin:0,
          'text-transform':'none',
          background:'#64b5f6',
          marginLeft:'40px'
      },
    categoryTitle:{
        fontWeight:500,
        fontSize:'large',
        marginLeft: 15
    }
});