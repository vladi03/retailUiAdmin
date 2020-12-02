import React, {Fragment, useEffect} from "react";
import {connectArray} from "../../utility/helpers";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {companyLocationModel} from "../../models/company/companyLocationsModel";
import {LocationItemEdit} from "./LocationItemEdit";

const LocationTableComponent = ({onLocationListInit, locationListInit,
                                    locationList, onSaveLocationItem,
                                    onDeleteLocation}) => {
    useEffect(()=> {
        if(!locationListInit)
            onLocationListInit();
    });
    const classes = useStyles();

    return (
        <Fragment>

            <Grid container className={classes.root} spacing={2}>
                {locationList.map((location) => {

                    return (
                        <Grid item xs={12} md={4} key={location._id}>
                            <LocationItemEdit
                                location={location}
                                saveLocation={onSaveLocationItem}
                                deleteLocation={onDeleteLocation}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
};

export const LocationTable = connectArray(LocationTableComponent,
    [companyLocationModel]);

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