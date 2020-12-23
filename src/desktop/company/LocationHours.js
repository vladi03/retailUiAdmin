import React, {useState} from  "react";
import {hoursToView} from "../../models/company/locationHoursManager";
import {Modal,Paper, ListItem, ListItemIcon,
    ListItemText, IconButton} from "@material-ui/core";
import {AccessTime, Close, Edit, Timelapse} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {LocationHoursEdit} from "./LocationHoursEdit";

export const LocationHours = ({hoursFull, save}) => {
    //const [hours, setHours] = useState(hoursToView(hoursFull));
    const hours = hoursToView(hoursFull);
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    return (
        <div>
            <ListItem>
                <ListItemIcon
                    style={{marginLeft: -25}}
                >
                    <IconButton
                        edge="end"
                        aria-label="Save"
                        color="primary"
                        classes={{
                            edgeEnd:classes.edgeEndChange
                        }}
                        onClick={()=> {
                            setOpen(true);
                        }}
                    >
                        <Edit />
                    </IconButton>
                </ListItemIcon>
                <ListItemText
                    primary="Hours"
                    classes={{
                        primary: undefined
                    }}
                />


            </ListItem>

            {hours.map((hour) => {

                return (
                    <div key={hour}>{hour}</div>
                )
              })
            }
            <Modal
                open={open}
                onClose={()=> setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={classes.modalPaper}>
                    <ListItem style={{
                        display: "flex",
                        marginTop:-15
                    }}>
                        <ListItemIcon style={{marginLeft:-20}}>
                            <AccessTime />
                        </ListItemIcon>

                        <ListItemText
                            primary="Hours"
                        />

                        <ListItemIcon className={classes.edgeEndChange}>
                            <IconButton
                                edge="end"
                                aria-label="Save"
                                color="primary"
                                classes={{
                                    edgeEnd:classes.edgeEndChange
                                }}
                                onClick={()=> {
                                    setOpen(false);
                                }}
                            >
                                <Close />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                    <LocationHoursEdit
                        hoursFull={hoursFull}
                        save={(newList)=> {
                            setOpen(false);
                            //setHours(hoursToView(newList));
                            save(newList);
                        }}
                    />
                </Paper>
            </Modal>
        </div>
    );
};


const useStyle = makeStyles({
    modalPaper: {
        position: 'absolute',
        width: 400,
        padding: 20,
        top: "5%",
        left: "calc(50% - 200px)",
        overflowX: "hidden",
        overflowY: "auto",
        minHeight: 300
    },
    edgeEndChange: {
        marginRight: -20
    },
});