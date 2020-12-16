import React, {Fragment, useState} from "react";
import {createHoursEditModel} from "../../models/company/locationHoursManager";
import {ListItem, ListItemIcon, Checkbox,
    ListItemText, TextField, Button} from "@material-ui/core"
import {Save} from "@material-ui/icons";
export const LocationHoursEdit = ({hoursFull, save}) => {
    const [viewHours, setViewHours] =
        useState(createHoursEditModel(hoursFull));
    const changeValue = (arrayIndex, fieldName, fieldValue) => {
        const newValue = viewHours.map((hour, index)=> {
            if(arrayIndex === index)
                return {...hour, [fieldName]: fieldValue};
            else
                return hour;
        });
        setViewHours(newValue);
    };

    return (
        <Fragment>
            {
                viewHours.map((hour, index) => {

                    return (
                        <ListItem key={hour.id} role={undefined} dense button>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={hour.selected}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={(event)=> {
                                        changeValue(index,"selected",
                                            event.target.checked)
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                style={{minWidth:100}}
                                primary={hour.name} />
                            <ListItemText
                                style={{minWidth:200}}
                                primary={
                                    <TextField
                                        label="Hours"
                                        value={hour.hours}
                                        onChange={(event) => {
                                            changeValue(index, "hours",
                                                event.target.value)
                                        }}
                                />}
                            />
                        </ListItem>
                    )
                })
            }
            <Button
                style={{marginTop: 20}}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                onClick={()=> {
                    save(viewHours.filter((vh)=> vh.selected)
                        .map((vh) => ({
                        day: vh.id,
                        hours: vh.hours
                    })))
                }}
            >
                Save
            </Button>
        </Fragment>
    );
};