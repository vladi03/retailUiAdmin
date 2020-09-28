import React, {Fragment} from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {OpenWith} from "@material-ui/icons";
import {CategoryTable} from "../catalog/CategoryTable";
import {makeStyles} from "@material-ui/core/styles";

export const CategoryMaintenance = ({}) => {
    const classes = useStyles();
    return (
        <Fragment>

            <AppBarTitleAddSearch
                title="Category"
                LeftIcon={OpenWith}
                onSearchChange={(value) => {}}
                onAdd={()=> {

                } }
            />
            <div className={classes.mainContainer}>
                <CategoryTable/>
            </div>
        </Fragment>
    )
};

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: "#e8e7e7",
        minHeight: "calc(100vh - 65px)",
        padding: 5,
        marginTop: -10
    }
});
