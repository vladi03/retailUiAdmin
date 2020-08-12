import React, {Fragment, useEffect} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";

export const CatalogTableComponent = ({catalogList, catalogListInit,
                                          onCatalogListInit}) => {
    useEffect(()=> {
        if(!catalogListInit)
            onCatalogListInit();
    });

    return (
        <Fragment>
            Test One, {catalogList.length}
        </Fragment>
    )
};

export const CatalogTable = connectArray(CatalogTableComponent,[catalogModel]);