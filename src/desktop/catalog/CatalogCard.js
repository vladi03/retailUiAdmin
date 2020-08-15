import React from "react";
import {Card, CardMedia, CardHeader} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCardSize} from "../../utility/useIsMobile";

export const CatalogCard = ({catalog}) => {
    /*
    const contWidth = window.innerWidth;
    let widthCalc = "";
    if(contWidth < 550) widthCalc= "calc(100vw - 5px)";
    else if(contWidth < 700) widthCalc= "calc(48vw - 5px)";
    else if(contWidth < 1200) widthCalc= "calc(32vw - 20px)";
    else widthCalc= "calc(24vw - 10px)";
    */
    const widthCalc = useCardSize();
    console.log(widthCalc);
    const classes = useStyle({
        widthCalc
    });
    // noinspection JSUnresolvedVariable
    return (
    <Card className={classes.card}>

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
    </Card>
    )
};
//props => props.widthCalc
const useStyle = makeStyles({
    card: {
        width: props => props.widthCalc,
        marginBottom: 20,
        backgroundColor: "#d0c6c626"
    },
    image: {
        width: "100%"
    }
});

