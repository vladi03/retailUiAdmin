import React from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";

const CatalogItemEditComponent = ({
     activeCatalogItem
}) => {

    return(
        <div>
            Name: {activeCatalogItem.shortDesc}
        </div>
    )
};

export const CatalogItemEdit = connectArray(CatalogItemEditComponent,
    [catalogModel]);