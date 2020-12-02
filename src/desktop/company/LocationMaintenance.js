import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {companyLocationModel} from "../../models/company/companyLocationsModel";
import {connectArray} from "../../utility/helpers";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {OpenWith} from "@material-ui/icons/index";
import {LocationTable} from "./LocationTable";

export const LocationMaintenanceComponent = ({onCreateNewLocation}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <AppBarTitleAddSearch
                title="Locations"
                LeftIcon={OpenWith}
                onSearchChange={(value) => {}}
                onAdd={()=> {
                    onCreateNewLocation();
                }}
            />
            <div className={classes.mainContainer}>
                <LocationTable/>
            </div>
        </Fragment>
    );
};

export const LocationMaintenance = connectArray(
    LocationMaintenanceComponent, [companyLocationModel]);

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: "#e8e7e7",
        minHeight: "calc(100vh - 65px)",
        padding: 5,
        marginTop: -10
    }
});