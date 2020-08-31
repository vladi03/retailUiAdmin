import React from "react";
import {Card, CardHeader, CardActionArea, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";
import {getStore} from "../../models/accounts/userAuthStore";

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
    const imageScale = willFitWidth ?
        classes.fixWidth : classes.fixHeight;

    const colorRgb = imageIsConfig && catalog.images[0].colorRgb;

    let colorGrad = willFitWidth ? ["to right"] : [];
    for (let i = 0; i < colorRgb.length ; i = i + 3) {
        const grad = `rgb(${colorRgb[i]},${colorRgb[i+1]}, ${colorRgb[i+2]})`;
        colorGrad.push(grad);
    }

    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>
        <CardActionArea
            onClick={() => {if(onClick) onClick();}}
        >
            <CardContent
                className={classes.imageContainer}
                style={{backgroundImage: `linear-gradient(${colorGrad.join()})`}}
            >
                <img
                    src={`${catalogApi}/catalogApi/api/v1/catalog/file/${imageId}`}
                    className={imageScale}
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
    card: {
        width: props => props.widthValue,
        marginBottom: 20,
        backgroundColor: "#d0c6c626"
    },
    imageContainer: {
        width: "100%",
        height: props => props.heightValue,
        overflow: "hidden",
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    image: {
        display: "block",
        marginTop:-20,
        marginLeft: -20
    },
    fixHeight: {
        height: "calc( 100% + 20px)",
        //marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        //marginTop:10,
        marginLeft: "auto"
    },
    fixWidth: {
        width: "100%",
        position: "sticky",
        top: "25%",
        //marginTop:10
    }
});

