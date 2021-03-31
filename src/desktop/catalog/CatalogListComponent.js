import React from "react";
import {CatalogCard} from "./CatalogCard";
import {Typography, Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connectArray} from "../../utility/helpers";
import {catalogModel} from "../../models/home/catalogModel";
import {categoryModel} from "../../models/home/categoryModel";
import {useIsMobile} from "../../utility/useIsMobile";


export const CatalogListComponent = ({catalogListFiltered ,categorySelected ,activeCatalogItem ,onSetCatalogStatus, onAddCategoryToCatalog,
         onRemoveCategoryFromCatalog ,catalogStatusLoading, onCatalogOrderChange, savingCatalogSort,
         onSetActiveCatalogItem, catalogListNoCategory, showSortArrows})=> {

    const inEdit = activeCatalogItem !== null;
    const classes = useStyle({inEdit});
    const isMobile = useIsMobile();


    return(
        <div className={classes.container}>
        <div className={classes.catalogListComponent}>

            {  catalogListFiltered.map((catalog, index)=> {

                    const prevCatalog = index > 0 ?
                        catalogListFiltered[index - 1] : null;

                    const nextCatalog =
                        catalogListFiltered.length > (index - 2) ?
                            catalogListFiltered[index + 1] : null;

                    const filterCategory = categorySelected && nextCatalog && nextCatalog.categories.filter(
                        (cat) => cat._id === categorySelected._id ) || [];


                    const nextIsInCategory = filterCategory.length > 0;
                    return(
                        <CatalogCard
                            showSortArrows={showSortArrows}
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
            <Divider variant="middle" />
            {!isMobile && catalogListNoCategory.length > 0 &&
            <Typography gutterBottom variant="h5">
                Items not in any Category
            </Typography>
            }

            <div className={classes.catalogListComponent}>

            {!isMobile && catalogListNoCategory.map((catalog, index)=> {

                    const prevCatalog = index > 0 ?
                        catalogListFiltered[index - 1] : null;

                    const nextCatalog =
                        catalogListFiltered.length > (index - 2) ?
                            catalogListFiltered[index + 1] : null;

                    const filterCategory = categorySelected && nextCatalog && nextCatalog.categories.filter(
                        (cat) => cat._id === categorySelected._id ) || [];


                    const nextIsInCategory = filterCategory.length > 0;
                    return(
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
    )
};

//space-between
//space-around
const useStyle = makeStyles({

    catalogListComponent: {
        '& :not(:nth-child(6n+1))' : {
            marginLeft: "calc( (97.6% - (16% * 6)) / 5 )"
        },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    }, container: {
        display:"block",
        flexWrap:"wrap",
        justifyContent: "flex-start",
        width: props => props.inEdit ? "24vw" : "100%",
        overflow: "auto",
    },noCatalogList: {
        '& :not(:nth-child(6n+1))' : {
            marginLeft: "calc( (97.6% - (16% * 6)) / 5 )"
        },
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
    },

});
export const CatalogList = connectArray(CatalogListComponent,[catalogModel, categoryModel]);
