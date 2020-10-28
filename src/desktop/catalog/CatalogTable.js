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

export const CatalogTableComponent = ({catalogList,catalogListFiltered,
       catalogListInit, onCatalogListInit, onAddCategoryToCatalog,
       onRemoveCategoryFromCatalog, onSetActiveCatalogItem, activeCatalogItem,
       onSetCatalogStatus, catalogStatusLoading, onCategorySelectChange,
       onCatalogOrderChange, savingCatalogSort}) => {

    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });

    const isMobile = useIsMobile();
    const [categorySelected, setCategorySelected] = useState(null);
    const inEdit = activeCatalogItem !== null;
    const classes = useStyle({inEdit});
    return (
        <Fragment>
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
                    {catalogListFiltered.map((catalog, index)=> {

                        const prevCatalog = index > 0 ?
                            catalogListFiltered[index - 1] : null;

                        const nextCatalog =
                            catalogListFiltered.length > (index - 2) ?
                                catalogListFiltered[index + 1] : null;

                        const filterCategory = categorySelected && nextCatalog && nextCatalog.categories.filter(
                            (cat) => cat._id === categorySelected._id ) || [];

                        const nextIsInCategory = filterCategory.length > 0;

                        return (
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
                        );
                        }
                    )}
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

export const CatalogTable = connectArray(CatalogTableComponent,[catalogModel]);

const useStyle = makeStyles({
    scrollContainer: {
        height: "calc( 100vh - 120px)",
        width: props => props.inEdit ? "24vw" : "100%",
        overflow: "auto"
    },
   container: {
       display:"flex",
       flexWrap:"wrap",
       justifyContent: "space-between",
       width:  "100%"
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