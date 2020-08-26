import React, {useState, useEffect} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {TextField, InputAdornment, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toCurrency} from "../../utility/helpers";

const containerWidth = 533;
const containerHeight = 300;

const CatalogItemEditComponent = ({
     activeCatalogItem, onSaveCatalogItem, catalogListLoading
}) => {
    const [itemEdit, setItemEdit] = useState({...activeCatalogItem});
    const [uploadImage, setUpLoadImage] = useState("#");
    const [willFitWidth, setWillFitWidth] = useState(true);
    const [colorRgb, setColorRgb] = useState([0,0,0]);
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
                value={itemEdit.unitPrice || 0}
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
            {!catalogListLoading &&
            < Button
                onClick={() => onSaveCatalogItem(itemEdit)}
                >Save</Button>
            }
            {catalogListLoading && <span>Saving...</span>}

            <input type="file" name="myFile" id="myFile"
                   onChange={(event) => {
                       console.log(event.target.files);
                       const reader = new FileReader();
                       reader.onload = function(e) {
                           console.log("image read locally");
                           setUpLoadImage(e.target.result);
                       };
                       reader.readAsDataURL(event.target.files[0]);
                   }}
            />
            <div className={classes.imageBox}
                 style={{backgroundColor: `rgb(${colorRgb[0]},${colorRgb[1]}, ${colorRgb[2]})`}}
            >
            <img id="blah"
                 src={uploadImage}
                 alt="your image"
                 className={willFitWidth ? classes.fixWidth : classes.fixHeight}
                 onLoad={(event)=> {
                     console.log(event.target);
                     const colorCalc = getColor(event.target);
                     console.log(event.target.naturalWidth);
                     const resultWillFixWidth =
                         calcWillFitWidth(
                             containerWidth,
                             containerHeight,
                             event.target.naturalWidth,
                             event.target.naturalHeight);

                     setWillFitWidth(resultWillFixWidth);
                     setColorRgb(colorCalc);
                 }}
            />
            </div>
        </div>
    )
};

const calcWillFitWidth = (containerWidth, containerHeight, imageWidth, imageHeight) => {
    return (containerWidth / imageWidth) <= (containerHeight / imageHeight);
};

export const CatalogItemEdit = connectArray(CatalogItemEditComponent,
    [catalogModel]);

const useStyle = makeStyles({
    textBox: {
        '& > *': {
            margin: 7,
        },
    },
    imageBox: {
        width: containerWidth,
        height: containerHeight,
        overflow: "hidden",
        border: "black solid 5px",
        backgroundColor: "#afcdee"
    },
    fixHeight: {
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",

    },
    fixWidth: {
        width: "100%",
        position: "sticky",
        top: "12.5%",
    }
});

const getColor = (imageTarget) => {
    const img = imageTarget;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
//event.offsetX, event.offsetY
    const pixelData = canvas.getContext('2d').getImageData(1,1, 1, 1).data;

    return [pixelData[0], pixelData[1], pixelData[2]];
};