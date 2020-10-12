import React from "react";
import {Card, CardHeader, CardActionArea, CardContent,
    FormControlLabel, Checkbox} from "@material-ui/core";
import {ThreeSixty} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";
import {getStore} from "../../models/accounts/userAuthStore";
import {toCurrency} from "../../utility/helpers";
import {PicRatioView} from "pic-ratio-fill";
const {catalogApi} = getStore();
export const CatalogCard = ({catalog, onClick, inEdit, onSetStatus,
                               disableEdit, isSaving, category,
                            onAddCategory, onRemoveCategory}) => {
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
    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>

        <CardActionArea

        >
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
                    (category && category._id && <FormControlLabel
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

        <CardHeader
            title={catalog.shortDesc}
            subheader={catalog.extraDesc}
            classes={{
                title:classes.cardTitle,
                subheader: classes.cardSubheader
            }}
        />
        </CardActionArea>
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
    }
});

