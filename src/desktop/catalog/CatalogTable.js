import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";

export const CatalogTableComponent = ({catalogList,catalogListFiltered,
                              catalogListInit, onCatalogListInit}) => {
    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });
    const [inEdit, setInEdit] = useState(false);
    const classes = useStyle({inEdit});
    return (
        <Fragment>
            Test One, {catalogList.length}
        <div className={classes.mainContainer}>

            <div className={classes.container}>
                {catalogListFiltered.map((catalog, index)=>(
                    <CatalogCard
                        key={index}
                        catalog={catalog}
                        onClick={()=> setInEdit(true)}
                    />
                ))}
            </div>
            {inEdit &&
            <div className={classes.containerEdit}>
                <IconButton
                    onClick={()=> setInEdit(false)}
                >
                    <Close/>
                </IconButton>
            </div>
            }

        </div>
        </Fragment>
    )
};

export const CatalogTable = connectArray(CatalogTableComponent,[catalogModel]);

const useStyle = makeStyles({
   container: {
       display:"flex",
       flexWrap:"wrap",
       justifyContent: "space-between",
       width: props => props.inEdit ? "45%" : "100%"
   },
    containerEdit: {
        display:"flex",
        flexWrap:"wrap",
        justifyContent: "flex-end",
        height: 80,
        width: "45%"
    },
    mainContainer: {
        display:"flex",
        flexWrap:"wrap",
    }
});