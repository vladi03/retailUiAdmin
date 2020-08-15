import React, {Fragment, useEffect, useState} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {CatalogCard} from "./CatalogCard";
import {makeStyles} from "@material-ui/core/styles";

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
            <div className={classes.container}>
                {catalogListFiltered.map((catalog, index)=>(
                    <CatalogCard
                        key={index}
                        catalog={catalog}
                        onClick={()=> setInEdit(true)}
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
       width: props => props.inEdit ? "50%" : "100%"
   }
});