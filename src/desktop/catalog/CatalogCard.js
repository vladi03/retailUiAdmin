import React from "react";
import {Card, CardHeader, CardActionArea, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";
import {getStore} from "../../models/accounts/userAuthStore";
import {toCurrency} from "../../utility/helpers";

const {catalogApi} = getStore();
export const CatalogCard = ({catalog, onClick, inEdit}) => {

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

    const colorGrad = willFitWidth ? ["to right"] : [];
    for (let i = 0; i < colorRgb.length ; i = i + 3) {
        const grad = `rgb(${colorRgb[i]},${colorRgb[i+1]}, ${colorRgb[i+2]})`;
        colorGrad.push(grad);
    }

    const colorGradOther = willFitWidth ? ["to right"] : [];
    for (let i = 0; i < colorRgbOther.length ; i = i + 3) {
        const grad = `rgb(${colorRgbOther[i]},${colorRgbOther[i+1]}, ${colorRgbOther[i+2]})`;
        colorGradOther.push(grad);
    }
    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>

        <CardActionArea
            onClick={() => {if(onClick) onClick();}}
        >
            <div className={classes.catPrice}>${toCurrency(catalog.unitPrice)}</div>
            <CardContent
                className={willFitWidth ? classes.imageBoxWidth : classes.imageBoxHeight}
            >
                <div className={willFitWidth ? classes.picBorderWidth : classes.picBorderHeight}
                     style={{backgroundImage: `linear-gradient(${colorGrad.join()})`}}
                />
                <div className={willFitWidth ? classes.fixWidth : classes.fixHeight}>
                    <img
                        src={`${catalogApi}/catalogApi/api/v1/catalog/file/${imageId}`}
                        className={willFitWidth ? classes.fixWidth : classes.fixHeight}
                    />
                </div>

                <div className={willFitWidth ? classes.picBorderWidth : classes.picBorderHeight}
                     style={{backgroundImage: `linear-gradient(${colorGradOther.join()})`}}
                />
            </CardContent>

        <CardHeader
            title={catalog.shortDesc}
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
    picBorderHeight: {
        width: "50%",
        height: props => props.heightValue,
        zIndex: 1,
    },
    picBorderWidth: {
        width: "100%",
        height: "50%",
        zIndex: 1,
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
    fixHeight: {
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        zIndex: 2
    },
    fixWidth: {
        width: "inherit",
        position: "absolute",
        transform: "translateY(-50%)",
        zIndex: 2
    }
});

