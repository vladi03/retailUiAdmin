import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, ListItemText, ListItem, TextField,
    ListItemIcon, FormControlLabel, Checkbox, IconButton,
    InputLabel, Select, MenuItem, FormControl
} from "@material-ui/core";
import {Category, Save, Delete} from "@material-ui/icons";

export const CategoryItemEdit = ({category, saveCategory, deleteCategoey}) => {
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

                <ListItemIcon>
                    <IconButton
                        edge="end"
                        aria-label="Save"
                        color="primary"
                        classes={{
                            edgeEnd:classes.edgeEndChange
                        }}
                        onClick={()=> {
                            deleteCategoey(itemEdit);
                            setItemChanged(false);
                        }}
                    >
                        <Delete />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <ListItem>
                <FormControlLabel
                    style={{width:"50%"}}
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
                <FormControl className={classes.formControl}>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        value={itemEdit.sort}
                        onChange={(event)=>{
                            onValueChange("sort",event.target.value)
                        }}
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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