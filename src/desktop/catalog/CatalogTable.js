import React, {Fragment, useEffect} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles} from "@material-ui/core/styles";

export const CatalogTableComponent = ({catalogList, catalogListInit,
                                          onCatalogListInit}) => {
    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });
    const classes = useStyle();
    return (
        <Fragment>
            Test One, {catalogList.length}
            <div className={classes.container}>
                {catalogList.map((catalog, index)=>(
                    <CatalogCard
                        key={index}
                        catalog={catalog}
                    />
                ))}
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
       width: "100%"
   }
});