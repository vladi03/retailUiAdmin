import React, {Fragment, useEffect} from "react";
import {connectArray} from "../../utility/helpers";
import {categoryModel} from "../../models/home/categoryModel";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {CategoryItemEdit} from "./CategoryItemEdit";

const CategoryTableComponent = ({onCategoryListInit, categoryListInit,
                                    categoryList, onSaveCategoryItem,
                                    onDeleteCategory}) => {
    useEffect(()=> {
        if(!categoryListInit)
            onCategoryListInit();
    });
    const classes = useStyles();

    return (
        <Fragment>

            <Grid container className={classes.root} spacing={2}>
            {categoryList.map((category, index) => {

                return (
                    <Grid item xs={12} md={4} key={category._id}>
                        <CategoryItemEdit
                            category={category}
                            saveCategory={onSaveCategoryItem}
                            deleteCategoey={onDeleteCategory}
                        />
                    </Grid>
                )
            })}
            </Grid>
        </Fragment>
    )
};

export const CategoryTable = connectArray(CategoryTableComponent,
    [categoryModel]);

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        minHeight: 140,
        width: "100%",
        //padding: theme.spacing(2),
    },
    control: {

    },
}));