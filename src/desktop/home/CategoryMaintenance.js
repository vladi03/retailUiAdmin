import React, {Fragment} from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {OpenWith} from "@material-ui/icons";
import {CategoryTable} from "../catalog/CategoryTable";
import {makeStyles} from "@material-ui/core/styles";
import {categoryModel} from "../../models/home/categoryModel";
import {connectArray} from "../../utility/helpers";

export const CategoryMaintenanceComponent = ({onCreateNewCategory}) => {
    const classes = useStyles();
    return (
        <Fragment>

            <AppBarTitleAddSearch
                title="Category"
                LeftIcon={OpenWith}
                onSearchChange={(value) => {}}
                onAdd={()=> {
                    onCreateNewCategory();
                }}
            />
            <div className={classes.mainContainer}>
                <CategoryTable/>
            </div>
        </Fragment>
    )
};

export const CategoryMaintenance = connectArray(
    CategoryMaintenanceComponent, [categoryModel]);

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: "#e8e7e7",
        minHeight: "calc(100vh - 65px)",
        padding: 5,
        marginTop: -10
    }
});
