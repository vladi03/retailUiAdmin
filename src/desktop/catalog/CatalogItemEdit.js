import React, {useState, useEffect} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {TextField, InputAdornment, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toCurrency} from "../../utility/helpers";

const CatalogItemEditComponent = ({
     activeCatalogItem, onSaveCatalogItem
}) => {
    const [itemEdit, setItemEdit] = useState({...activeCatalogItem});
    const onValueChange = (fieldName, value) => setItemEdit({...itemEdit, [fieldName]: value});
    const classes = useStyle();
    useEffect(()=>{
        if(activeCatalogItem._id !== itemEdit._id)
            setItemEdit({...activeCatalogItem});
    });
    return(
        <div className={classes.textBox}>
            <TextField
                style={{width:"32%"}}
                label="Short Desc"
                value={itemEdit.shortDesc}
                onChange={(event) => onValueChange("shortDesc", event.target.value)}
            />
            <TextField
                style={{width:"42%"}}
                label="Extra Desc"
                value={itemEdit.extraDesc}
                onChange={(event) => onValueChange("extraDesc", event.target.value)}
            />
            <TextField
                style={{width:"20%"}}
                label={`Unit Price:$ ${toCurrency(itemEdit.unitPrice)}`}
                value={itemEdit.unitPrice}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">$</InputAdornment>
                }}
                onChange={(event) => onValueChange("unitPrice", parseFloat(event.target.value))}
            />
            <TextField
                style={{width:"100%"}}
                multiline
                rowsMax={4}
                label="Description"
                value={itemEdit.description}
                onChange={(event) => onValueChange("description", event.target.value)}
            />
            <Button
                onClick={() => onSaveCatalogItem(itemEdit)}
            >Save</Button>

        </div>
    )
};

export const CatalogItemEdit = connectArray(CatalogItemEditComponent,
    [catalogModel]);

const useStyle = makeStyles({
    textBox: {
        '& > *': {
            margin: 7,
        },
    },
});