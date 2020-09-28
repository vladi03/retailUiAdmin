import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, ListItemText, ListItem, TextField,
    ListItemIcon, FormControlLabel, Checkbox, IconButton,
} from "@material-ui/core";
import {Category, Save} from "@material-ui/icons";

export const CategoryItemEdit = ({category, saveCategory}) => {
    const [itemChanged, setItemChanged] = useState(false);
    const [itemEdit, setItemEdit] = useState({...category});
    const onValueChange = (fieldName, value) => {
        setItemEdit({...itemEdit, [fieldName]: value});
        setItemChanged(true);
    };

    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <ListItem style={{display: "flex"}}>
                <ListItemIcon>
                    <Category />
                </ListItemIcon>
                <ListItemText
                    primary={itemEdit.category}
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
                            saveCategory(itemEdit);
                            setItemChanged(false);
                        }}
                    >
                        <Save />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <ListItem>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={itemEdit.systemOnly}
                        onChange={(event)=> {
                            const newStatus = event.target.checked;
                            onValueChange("systemOnly",newStatus);
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label="System"
            />
            </ListItem>
            <ListItem>
                <TextField
                    style={{width:"100%"}}
                    label="Title"
                    value={itemEdit.category}
                    onChange={(event) => onValueChange("category", event.target.value)}
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