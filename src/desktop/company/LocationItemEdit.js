import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, ListItemText, ListItem, TextField,
    ListItemIcon, IconButton
} from "@material-ui/core";
import {HomeTwoTone, Save, Delete} from "@material-ui/icons";
import {LocationHours} from "./LocationHours";

export const LocationItemEdit = ({location, saveLocation,
                                     deleteLocation}) => {

    const [itemChanged, setItemChanged] = useState(false);
    const [itemEdit, setItemEdit] = useState({...location});
    const onValueChange = (fieldName, value, setChange = true) => {
        setItemEdit({...itemEdit, [fieldName]: value});
        setItemChanged(setChange);
    };

    const onChangeAddress = (fieldName, value) => {
        const address = {...itemEdit.address, [fieldName]: value};
        setItemEdit({...itemEdit, address });
        setItemChanged(true);
    };

    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <ListItem style={{display: "flex"}}>
                <ListItemIcon>
                    <HomeTwoTone />
                </ListItemIcon>
                <ListItemText
                    primary={itemEdit.locationName}
                    classes={{
                        primary: itemChanged ? classes.title : undefined
                    }}
                />

                <ListItemIcon>
                    <IconButton
                        edge="end"
                        aria-label="Save"
                        color="primary"
                        classes={{
                            edgeEnd:classes.edgeEndChange
                        }}
                        onClick={()=> {
                            saveLocation(itemEdit);
                            setItemChanged(false);
                        }}
                    >
                        <Save />
                    </IconButton>
                </ListItemIcon>

                <ListItemIcon>
                    <IconButton
                        edge="end"
                        aria-label="Save"
                        color="primary"
                        classes={{
                            edgeEnd:classes.edgeEndChange
                        }}
                        onClick={()=> {
                            deleteLocation(itemEdit);
                            setItemChanged(false);
                        }}
                    >
                        <Delete />
                    </IconButton>
                </ListItemIcon>
            </ListItem>

            <ListItem>
                <TextField
                    style={{width:"100%"}}
                    label="Title"
                    value={itemEdit.locationName}
                    onChange={(event) => onValueChange("locationName", event.target.value)}
                />
            </ListItem>

            <ListItem>
                <TextField
                    style={{width:"100%"}}
                    label="Address 1"
                    value={itemEdit.address.address1}
                    onChange={(event) => onChangeAddress("address1", event.target.value)}
                />
            </ListItem>

            <ListItem>
                <TextField
                    style={{width:"100%"}}
                    label="Address 2"
                    value={itemEdit.address.address2}
                    onChange={(event) => onChangeAddress("address1", event.target.value)}
                />
            </ListItem>

            <ListItem>
                <TextField
                    style={{width:"45%", marginRight:"10%"}}
                    label="City"
                    value={itemEdit.address.city}
                    onChange={(event) => onChangeAddress("city", event.target.value)}
                />

                <TextField
                    style={{width:"45%"}}
                    label="State"
                    value={itemEdit.address.state}
                    onChange={(event) => onChangeAddress("state", event.target.value)}
                />
            </ListItem>

            <ListItem>
                <TextField
                    style={{width:"30%", marginRight:"5%"}}
                    label="Zip Code"
                    value={itemEdit.address.zipCode}
                    onChange={(event) => onChangeAddress("zipCode", event.target.value)}
                />

                <TextField
                    style={{width:"30%", marginRight:"5%"}}
                    label="Phone#"
                    value={itemEdit.phonePublic}
                    onChange={(event) => onValueChange("phonePublic", event.target.value)}
                />

                <TextField
                    style={{width:"30%"}}
                    label="Map Link"
                    value={itemEdit.mapLink}
                    onChange={(event) => onValueChange("mapLink", event.target.value)}
                />
            </ListItem>
            <ListItem>
                <LocationHours
                    hoursFull={itemEdit.hours}
                    save={(hours)=> {
                        onValueChange("hours",hours, false);
                        saveLocation({...itemEdit, hours});
                    }}
                    />
            </ListItem>
        </Paper>
    );
};

const useStyles = makeStyles(() => ({
    paper: {
        minHeight: 140,
        width: "100%",
        //padding: theme.spacing(2),
    },
    edgeEndChange: {
        marginRight: -20
    },
    title: {
        fontWeight: 900,
        color: "limegreen",
        fontSize: "x-large"
    }
}));