import React, {Fragment} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {OpenWith} from "@material-ui/icons";
import {CatalogTable} from "../catalog/CatalogTable";
import {connectArray} from "../../utility/helpers";
import {catalogModel} from "../../models/home/catalogModel";

export const HomeMainComponent = ({onCreateNewCatalog,
    onCatalogSearch, catalogSearchText }) => {
    //const { user, isAuthenticated } = useAuth0();

    return (
        <Fragment>
            <AppBarTitleAddSearch
                title="Catalogs"
                LeftIcon={OpenWith}
                onSearchChange={(value) => {
                    onCatalogSearch(value);
                }}

                onAdd={()=> {
                    onCreateNewCatalog();
                } }
            />
            <CatalogTable/>
        </Fragment>
    );
};

export const HomeMain = connectArray(HomeMainComponent,[catalogModel]);