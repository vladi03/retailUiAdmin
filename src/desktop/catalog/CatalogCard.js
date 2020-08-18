import React from "react";
import {Card, CardMedia, CardHeader, CardActionArea} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";

export const CatalogCard = ({catalog, onClick, inEdit}) => {

    const widthCalc = useCardSize();
    const widthValue= inEdit ? "100%" : widthCalc;

    const classes = useStyle({
        widthValue
    });
    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>
        <CardActionArea
            onClick={() => {if(onClick) onClick();}}
        >
        <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.image}
            image="https://www.darbyfurnitureoutlet.com/df21/content/images/LR00051S.jpg"
            title="Contemplative Reptile"
        />
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
    image: {
        width: "100%"
    }
});

