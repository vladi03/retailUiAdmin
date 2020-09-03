import React, {useState, useEffect} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {connectArray} from "../../utility/helpers";
import {TextField, InputAdornment, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toCurrency} from "../../utility/helpers";
import {getStore} from "../../models/accounts/userAuthStore";
const {catalogApi} = getStore();
const containerWidth = 532;
const containerHeight = 415;

const CatalogItemEditComponent = ({
     activeCatalogItem, onSaveCatalogItem, catalogListLoading,
     onUploadImage
}) => {
    const imageIsConfig = activeCatalogItem.images
        && activeCatalogItem.images.length > 0;

    const imageId = imageIsConfig ?
        activeCatalogItem.images[0].id : "5f41d4dac6f0db5918e4cb20";

    const rgbData = imageIsConfig ?
        activeCatalogItem.images[0].colorRgb : [0,0,0];
    const metaUpload = imageIsConfig ?
        {
            "id": activeCatalogItem.images[0].id,
            "fileName": activeCatalogItem.images[0].fileName
        } : null;

    const imageUrl = `${catalogApi}/catalogApi/api/v1/catalog/file/${imageId}`;
    const [itemEdit, setItemEdit] = useState({...activeCatalogItem});
    const [uploadImage, setUpLoadImage] = useState(imageUrl);

    const [uploadImageMetadata, setUpLoadImageMetadata] = useState(metaUpload);

    const [willFitWidth, setWillFitWidth] = useState(true);
    const [colorRgb, setColorRgb] = useState(rgbData);
    const [colorRgbOther,setColorRgbOther] = useState(rgbData);
    const onValueChange = (fieldName, value) => setItemEdit({...itemEdit, [fieldName]: value});
    const classes = useStyle();
    useEffect(()=>{
        if(activeCatalogItem._id !== itemEdit._id) {
            const imageIsConfig = activeCatalogItem.images
                && activeCatalogItem.images.length > 0;

            setItemEdit({...activeCatalogItem});
            setUpLoadImage(imageUrl);
            setColorRgb(rgbData);
            setUpLoadImageMetadata(metaUpload);
            setWillFitWidth(imageIsConfig &&
                activeCatalogItem.images[0].willFitWidth);
        }
    });
    const colorGrad = willFitWidth ? ["to right"] : [];
    for (let i = 0; i < colorRgb.length ; i = i + 3) {
        const grad = `rgb(${colorRgb[i]},${colorRgb[i+1]}, ${colorRgb[i+2]})`;
        colorGrad.push(grad);
    }

    const colorGradOther = willFitWidth ? ["to right"] : [];
    for (let i = 0; i < colorRgbOther.length ; i = i + 3) {
        const grad = `rgb(${colorRgbOther[i]},${colorRgbOther[i+1]}, ${colorRgbOther[i+2]})`;
        colorGradOther.push(grad);
    }

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
                onClick={() => onSaveCatalogItem(itemEdit, uploadImageMetadata, willFitWidth, colorRgb, colorRgbOther)}
                >Save</Button>
            }
            {catalogListLoading && <span>Saving...</span>}

            <input type="file" name="myFile" id="myFile"
                   onChange={async (event) => {
                       console.log(event.target.files);
                       const reader = new FileReader();
                       reader.onload = function(e) {
                           console.log("image read locally");
                           setUpLoadImage(e.target.result);
                       };
                       reader.readAsDataURL(event.target.files[0]);
                       const uploadResult = await onUploadImage(event.target.files[0]);

                       if(uploadResult.uploadImageResult) {
                           setUpLoadImageMetadata(uploadResult.uploadImageResult);
                       }
                   }}
            />
            <div className={willFitWidth ? classes.imageBoxWidth : classes.imageBoxHeight}>
                <div className={willFitWidth ? classes.picBorderWidth : classes.picBorderHeight}
                     style={{backgroundImage: `linear-gradient(${colorGrad.join()})`}}
                />
                <div className={willFitWidth ? classes.fixWidth : classes.fixHeight}>
                    <img id="blah"
                         src={uploadImage}
                         alt="your image"
                         className={willFitWidth ? classes.fixWidth : classes.fixHeight}

                         onLoad={(event)=> {

                             const colorCalc = getColor(event.target, willFitWidth);
                             const colorCalcOther = getColorOther(event.target, willFitWidth);
                             console.log(willFitWidth);
                             const resultWillFixWidth =
                                 calcWillFitWidth(
                                     containerWidth,
                                     containerHeight,
                                     event.target.naturalWidth,
                                     event.target.naturalHeight);

                             setWillFitWidth(resultWillFixWidth);
                             setColorRgb(colorCalc);
                             setColorRgbOther(colorCalcOther);
                         }}
                    />
                </div>
                <div className={willFitWidth ? classes.picBorderWidth : classes.picBorderHeight}
                     style={{backgroundImage: `linear-gradient(${colorGradOther.join()})`}}
                />
            </div>
        </div>
    )
};

const calcWillFitWidth = (containerWidth, containerHeight, imageWidth, imageHeight) => {
    return ((1.28 * containerHeight) / imageWidth) <= (containerHeight / imageHeight);
};

export const CatalogItemEdit = connectArray(CatalogItemEditComponent,
    [catalogModel]);

const useStyle = makeStyles({
    textBox: {
        '& > *': {
            margin: 7,
        },
    },
    picBorderHeight: {
        width: "50%",
        height: containerHeight,
        zIndex: 1,
    },
    picBorderWidth: {
        width: "100%",
        height: "50%",
        zIndex: 1,
    },
    imageBoxHeight: {
        width: containerWidth,
        height: containerHeight,
        overflow: "hidden",
        backgroundColor: "#afcdee",
        display:"flex"
    },
    imageBoxWidth: {
        width: containerWidth,
        height: containerHeight,
        overflow: "hidden",
        backgroundColor: "#afcdee"
    },
    fixHeight: {
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        zIndex: 2
    },
    fixWidth: {
        width: "inherit",
        position: "absolute",
        transform: "translateY(-50%)",
        zIndex: 2
    }
});

const getColor = (imageTarget, willFitWidth) => {
    const img = imageTarget;
    img.crossOrigin = "Anonymous";
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    //this gets the upper left hand corner pixel
    const pixelData = canvas.getContext('2d').getImageData(1, 1, 1, 1).data;
    const resultArray = [pixelData[0], pixelData[1], pixelData[2]];
    const incrementPixTall = (img.height-1)/20;
    const incrementPixWidth = (img.width-1)/20;
    for (let i = 1; i < 21; i++) {
        const yValue = (incrementPixTall * i);
        const xValue = (incrementPixWidth * i);

        const pixelDataLower = willFitWidth ?
            canvas.getContext('2d').getImageData(xValue, 1, 1, 1).data :
            canvas.getContext('2d').getImageData(1, yValue, 1, 1).data;

        resultArray.push(pixelDataLower[0]);
        resultArray.push(pixelDataLower[1]);
        resultArray.push(pixelDataLower[2]);
    }

    //RGB Color in an array [R, G, B]
    return resultArray;
};

const getColorOther = (imageTarget, willFitWidth) => {
    const img = imageTarget;
    img.crossOrigin = "Anonymous";
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    //this gets the upper left hand corner pixel
    const pixelData = canvas.getContext('2d').getImageData(1, 1, 1, 1).data;
    const resultArray = [pixelData[0], pixelData[1], pixelData[2]];
    const incrementPixTall = (img.height-1)/20;
    const incrementPixWidth = (img.width-1)/20;
    for (let i = 1; i < 21; i++) {
        const yValue = (incrementPixTall * i);
        const xValue = (incrementPixWidth * i);

        const pixelDataLower = willFitWidth ?
            canvas.getContext('2d').getImageData(xValue, (img.height-1), 1, 1).data :
            canvas.getContext('2d').getImageData((img.width-1), yValue, 1, 1).data;

        resultArray.push(pixelDataLower[0]);
        resultArray.push(pixelDataLower[1]);
        resultArray.push(pixelDataLower[2]);
    }

    //RGB Color in an array [R, G, B]
    return resultArray;
};