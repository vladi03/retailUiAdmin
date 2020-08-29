import React from "react";
import {Card, CardMedia, CardHeader, CardActionArea, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";
import {getStore} from "../../models/accounts/userAuthStore";

const containerWidth = 533;
const containerHeight = 300;

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

    const imageScale = imageIsConfig && catalog.images[0].willFitWidth ?
        classes.fixWidth : classes.fixHeight;

    const imageBack = imageIsConfig &&
        `rgb(${catalog.images[0].colorRgb[0]}, ${catalog.images[0].colorRgb[1]}, ${catalog.images[0].colorRgb[2]})`
        || "white";

    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>
        <CardActionArea
            onClick={() => {if(onClick) onClick();}}
        >
            <CardContent
                className={classes.imageContainer}
                style={{backgroundColor:imageBack}}
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
        paddingTop: 0
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
        top: "12.5%",
        marginTop:10
    }
});

