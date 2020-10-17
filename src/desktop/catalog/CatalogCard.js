import React from "react";
import {Card, CardHeader, CardContent,
    FormControlLabel, Checkbox, IconButton} from "@material-ui/core";
import {ThreeSixty, ArrowUpward, ArrowDownward} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";
import {getStore} from "../../models/accounts/userAuthStore";
import {toCurrency} from "../../utility/helpers";
import {PicRatioView} from "pic-ratio-fill";
const {catalogApi} = getStore();

export const CatalogCard = ({catalog, onClick, inEdit, onSetStatus,
                            disableEdit, isSaving, category, savingCatalogSort,
                            onAddCategory, onRemoveCategory,
                            onOrderChange, prevCatalog, nextCatalog}) => {

    const {widthCalc, heightPicCalc} = useCardSize();
    const widthValue= inEdit ? "100%" : widthCalc;
    const imageIsConfig = catalog.images && catalog.images.length > 0;

    const imageId = imageIsConfig ?
        catalog.images[0].id : "5f41d4dac6f0db5918e4cb20";

    const classes = useStyle({
        widthValue,
        heightValue: heightPicCalc
    });

    const willFitWidth = imageIsConfig && catalog.images[0].willFitWidth;
    const colorRgb = imageIsConfig && catalog.images[0].colorRgb;
    const colorRgbOther = imageIsConfig && catalog.images[0].colorRgbOther;

    const filterCategory = category && catalog.categories.filter(
        (cat) => cat._id === category._id ) || [];
    const isInCategory = filterCategory.length > 0;

    const inCategoryEdit = category && category._id;

    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>

        <div className={classes.cardContainer} >
            {!disableEdit &&
            (
                isSaving ?
                    <FormControlLabel
                        control={
                            <ThreeSixty/>
                        }
                        label="Saving"
                        style={{minHeight: 42, marginLeft: 10}}
                    /> :
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={catalog.status === "active"}
                                onChange={(event) => {
                                    const newStatus = event.target.checked ?
                                        "active" : "disabled";
                                    onSetStatus(newStatus, catalog._id);
                                }}
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label="Active"
                        style={{marginLeft: 3}}
                    />
            )
            }

            {!disableEdit &&
            (
                isSaving ?
                    <FormControlLabel
                        control={
                            <ThreeSixty/>
                        }
                        label="Saving"
                        style={{minHeight: 42, marginLeft: 10}}
                    /> :
                    (inCategoryEdit && <FormControlLabel
                        control={
                            <Checkbox
                                checked={isInCategory}
                                onChange={(event) => {
                                    const newStatusChecked = event.target.checked;
                                    if(newStatusChecked)
                                        onAddCategory({
                                            catalog:catalog,
                                            category
                                        });
                                    else
                                        onRemoveCategory({
                                            catalog:catalog,
                                            categoryId:category._id
                                        });
                                }}
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label="In Category"
                        style={{marginLeft: 3}}
                    />
                    )
            )
            }

            <div className={classes.catPrice}>${toCurrency(catalog.unitPrice)}</div>
            {inCategoryEdit && !savingCatalogSort && prevCatalog && isInCategory &&
                <IconButton aria-label="Up"
                            className={classes.buttonUp}
                            onClick={()=> onOrderChange(catalog, category, prevCatalog)}
                >
                    <ArrowUpward fontSize="large" />
                </IconButton>
            }
            <CardContent
                onClick={() => {if(onClick) onClick();}}
                className={willFitWidth ? classes.imageBoxWidth : classes.imageBoxHeight}
            >
                <PicRatioView
                    src={`${catalogApi}/catalogApi/api/v1/catalog/file/${imageId}`}
                    width={widthValue}
                    height={heightPicCalc}
                    colorRgb={colorRgb}
                    colorRgbOpposite={colorRgbOther}
                    willFitWidth={willFitWidth}
                />

            </CardContent>
            {inCategoryEdit && !savingCatalogSort && nextCatalog && isInCategory &&
            <IconButton aria-label="Up"
                        className={classes.buttonDown}
                        onClick={()=> onOrderChange(catalog, category, nextCatalog)}
            >
                <ArrowDownward fontSize="large"/>
            </IconButton>
            }
        <CardHeader
            title={catalog.shortDesc}
            subheader={catalog.extraDesc}
            classes={{
                title:classes.cardTitle,
                subheader: classes.cardSubheader
            }}
        />
        </div>
    </Card>
    )
};
//props => props.widthCalc
const useStyle = makeStyles({
    catPrice: {
        position: "absolute",
        //transform: "translate(10%, 15%)",
        zIndex: 9,
        padding: 15,
        backgroundColor: "#000000ba",
        font: "800 16px Arial",
        "border-bottom-right-radius": 10,
        color: "white"
    },
    card: {
        width: props => props.widthValue,
        marginBottom: 20,
        backgroundColor: "#d0c6c626"
    },
    cardContainer: {
        position: "relative"
    },
    cardTitle: {
        fontSize: 16
    },
    cardSubheader: {
        fontSize: 14
    },
    imageBoxHeight: {
        width: props => props.widthValue,
        height: props => props.heightValue,
        overflow: "hidden",
        backgroundColor: "#afcdee",
        display:"flex",
        padding:0
    },
    imageBoxWidth: {
        width: props => props.widthValue,
        height: props => props.heightValue,
        overflow: "hidden",
        backgroundColor: "#afcdee",
        padding:0
    },
    buttonUp : {
        position: "absolute",
        //transform: "translate(10%, 15%)",
        zIndex: 9,
        padding: 15,
        backgroundColor: "#1095ec8f",
        left: "calc(50% - 20px)",
        top: 40
    },
    buttonDown : {
        position: "absolute",
        //transform: "translate(10%, 15%)",
        zIndex: 9,
        padding: 15,
        backgroundColor: "#1095ec8f",
        left: "calc(50% - 20px)",
        bottom: 75
    }
});

