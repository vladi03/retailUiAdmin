import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {siteModel} from "../../models/company/siteModel";
import {connectArray} from "../../utility/helpers";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Button, IconButton, Typography} from "@material-ui/core";
import {Close, Edit, Save} from "@material-ui/icons";
import {CatalogItemEdit} from "./CatalogItemEdit";
import {useIsMobile} from "../../utility/useIsMobile";
import {CategorySelect} from "./CategorySelect";
import {PopupError} from "../../utility/components/PopupError";
import {Accordion } from '@material-ui/core';
import {categoryModel} from "../../models/home/categoryModel";
import {CatalogList} from "./CatalogListComponent";
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CatalogItemIcon} from "../SiteIcons";
import {HuePicker, CompactPicker} from "react-color";

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
export const CatalogTableComponent = ({catalogList,catalogTotals,onSetCatalogTotals,
                                          catalogListInit, onCatalogListInit,
                                          onSetActiveCatalogItem, activeCatalogItem,
                                          onCategorySelectChange, catalogListLoadError,
                                          onClearCatalogError, categoryList,
                                        onSaveSiteColor, siteDataInitialized, onLoadSite,
                                          site, setSalesBackgroundColor, setSalesFontColor
                                      }) => {

    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
        if(!siteDataInitialized)
            onLoadSite();
    });
    useEffect(()=> {
        if(catalogTotals.length===0 && categoryList.length > 0 &&
            catalogList.length > 0) {

            onSetCatalogTotals(categoryList, catalogList);
        }
    });


    const isMobile = useIsMobile();
    const [categorySelected, setCategorySelected] = useState({_id:null, category: "All"});
    const [editSalesTextStyle, setEditSalesTextStyle] =
        useState(false);

    console.log("site");
    console.log(site);
    const salesBackgroundColor = site.salesBackgroundColor ?? [0,255,255];
    const salesFontColor = site.salesFontColor ?? [0,0,0];
    console.log(salesBackgroundColor);

    const [showSortArrows, setShowSortArrows] = useState(false);
    const inEdit = activeCatalogItem !== null;
    const classes = useStyle({inEdit});

    const errorMessage = catalogListLoadError &&
        Array.isArray(catalogListLoadError) &&
        catalogListLoadError.length > 0 &&
        `${catalogListLoadError[0].dataPath} ${catalogListLoadError[0].message}`
        || "Error Saving";
    console.log(errorMessage);


    const salesBackgroundRgbValue = salesBackgroundColor?.length > 2 ?
        `rgb(${salesBackgroundColor[0]},${salesBackgroundColor[1]}, ${salesBackgroundColor[2]})`:
        "rgb(255,255,255)";

    //salesFontColor
    const salesFontRgbValue = salesFontColor.length > 2 ?
        `rgb(${salesFontColor[0]},${salesFontColor[1]}, ${salesFontColor[2]})`:
        "rgb(255,255,255)";

    return (
        <Fragment>
            <PopupError
                errorMessage={catalogListLoadError && errorMessage || ""}
                onClearErrorMessage={() => onClearCatalogError(false)}
                status={"error"}
            />
            <Accordion
                expanded={editSalesTextStyle}
                className={classes.accordion}
                onChange={()=> {
                    setEditSalesTextStyle(!editSalesTextStyle);
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Edit />
                    <Typography className={classes.categoryTitle}>
                        Sales Text Styling
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display:"flex"}}>
                        <div>
                            <div style={{display:"flex"}}>
                                <Typography className={classes.categoryTitle}
                                            style={{padding: 10, width: 250}}
                                >
                                    Sales Background Color
                                </Typography>
                                <div style={{display: "flex",

                                    padding: "7px"
                                }}
                                >
                                    <HuePicker
                                        color={{r: salesBackgroundColor[0], g: salesBackgroundColor[1], b: salesBackgroundColor[2]}}
                                        onChangeComplete={(color) => {
                                            setSalesBackgroundColor([color.rgb.r, color.rgb.g, color.rgb.b]);
                                        }}
                                    />

                                </div>
                            </div>
                            <div style={{display:"flex"}}>
                                <Typography className={classes.categoryTitle}
                                            style={{padding: 10, width: 250}}
                                >
                                    Sales Font Color
                                </Typography>
                                <div style={{display: "flex",

                                    padding: "7px",
                                    marginTop: 10
                                }}
                                >
                                    <CompactPicker
                                        color={{r: salesFontColor[0], g: salesFontColor[1], b: salesFontColor[2]}}
                                        onChangeComplete={(color) => {
                                            setSalesFontColor([color.rgb.r, color.rgb.g, color.rgb.b]);
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div style={{paddingLeft: 20, display: "flex"}}>
                            <div
                                className={classes.catSale}
                                style={{
                                    "backgroundColor": `${salesBackgroundRgbValue}`,
                                    "color": `${salesFontRgbValue}`,
                                    "width": 35,
                                    "height": 20
                                }}
                            >$999</div>

                            <div style={{margin: 20}}>
                                <Button variant="contained"
                                        color="primary"
                                        startIcon={<Save />}
                                        style={{marginRight: 20}}
                                        onClick={() => onSaveSiteColor({salesBackgroundColor,salesFontColor})}
                                >
                                    Save Style
                                </Button>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>

            </Accordion>

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

                        {categoryList.map((category) => {
                           const totals= catalogTotals ? catalogTotals.filter((aItem) =>
                                aItem._id === category._id) : [];
                           const expandCategory = category._id === categorySelected._id;
                            return(

                            <Accordion expanded={expandCategory}
                                       TransitionProps={{timeout:0}}
                                       onChange={()=>{
                                           console.log("click");
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
                                        !isMobile && totals.length > 0 &&
                                            <Typography style={{marginRight: '10%', position: 'absolute', right: 30}}>
                                                Active: {totals[0].activeTotal} Disabled: {totals[0].disabledTotal} Total: {totals[0].disabledTotal + totals[0].activeTotal}
                                            </Typography>
                                    }
                                    {!isMobile && !inEdit&& category._id === categorySelected._id ?
                                        <>
                                        <Button variant="contained"
                                                color="primary"
                                                className={classes.reorderButton}
                                                onClick={(event)=> {
                                                    event.stopPropagation();
                                                    setShowSortArrows(!showSortArrows);
                                                    console.log("test");
                                                }}
                                        >
                                            {showSortArrows ? "Hide" : "Show" } Reorder Arrows
                                        </Button>
                                        </> : null}
                                        </>
                                    }


                                </AccordionSummary>
                                <AccordionDetails>

                                    {expandCategory && <CatalogList
                                        showSortArrows={!isMobile && showSortArrows}
                                    />
                                    }
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

export const CatalogTable = connectArray(CatalogTableComponent,
    [catalogModel, categoryModel, siteModel]);

const useStyle = makeStyles({
    catSale: {
        //position: "absolute",
        //transform: "translate(10%, 15%)",
        zIndex: 9,
        padding: 15,
        //font: "800 16px Arial",
        "border-bottom-right-radius": 10,
        "border-bottom-left-radius": 10,
        "border-top-left-radius": 10,
        color: "white",
        right:0,
        transform: "rotate(0deg)"
    },
    scrollContainer: {
        height: "calc( 100vh - 120px)",
        width: props => props.inEdit ? "0vw" : "100%",
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
