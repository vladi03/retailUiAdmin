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
            <div className={classes.scrollContainer}>
                <div className={classes.container}>
                    {catalogListFiltered.map((catalog, index)=>(
                        <CatalogCard
                            key={index}
                            inEdit={inEdit}
                            catalog={catalog}
                            onClick={()=> setInEdit(true)}
                        />
                    ))}
                </div>
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
    scrollContainer: {
        height: "calc( 100vh - 80px)",
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
        justifyContent: "flex-end",
        height: 80,
        width: "calc( 75vw - 77px)"
    },
    mainContainer: {
        display:"flex",
        flexWrap:"wrap",
    }
});