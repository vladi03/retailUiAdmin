import React, {useState, useEffect, Fragment} from "react";
import {catalogModel} from "../../models/home/catalogModel";
import {categoryModel} from "../../models/home/categoryModel";
import {connectArray} from "../../utility/helpers";
import {TextField, InputAdornment, Button, Paper,
Checkbox, FormControlLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toCurrency} from "../../utility/helpers";
import {getStore} from "../../models/accounts/userAuthStore";
import {PicRatioFill} from "pic-ratio-fill";

const {catalogApi} = getStore();
const containerWidth = 532;
const containerHeight = 415;

const CatalogItemEditComponent = ({
     activeCatalogItem, onSaveCatalogItem, catalogListLoading,
     onUploadImage, onDeleteCatalog, imageUploading, categoryList
}) => {
    const imageIsConfig = activeCatalogItem.images
        && activeCatalogItem.images.length > 0;
    const imageId = imageIsConfig ?
        activeCatalogItem.images[0].id : false;

    const imageUrl = imageIsConfig ?
        `${catalogApi}/catalogApi/api/v1/catalog/file/${imageId}` :
        null
    ;

    const rgbData = imageIsConfig ?
        activeCatalogItem.images[0].colorRgb : [0,0,0];
    const metaUpload = imageIsConfig ?
        {
            "id": activeCatalogItem.images[0].id,
            "fileName": activeCatalogItem.images[0].fileName
        } : null;


    const [itemEdit, setItemEdit] = useState({...activeCatalogItem});
    const [uploadImage, setUpLoadImage] = useState(imageUrl);

    const [uploadImageMetadata, setUpLoadImageMetadata] = useState(metaUpload);

    const [willFitWidth, setWillFitWidth] = useState(
        imageIsConfig ? activeCatalogItem.images[0].willFitWidth : true);

    const [colorRgb, setColorRgb] = useState(rgbData);
    const [colorRgbOther,setColorRgbOther] = useState(rgbData);
    const [unitPrice, setUnitPrice] = useState(itemEdit.unitPrice);

    const onValueChange = (fieldName, value) => setItemEdit({...itemEdit, [fieldName]: value});
    const classes = useStyle();
    useEffect(()=>{
        if(activeCatalogItem._id !== itemEdit._id) {
            const imageIsConfig = activeCatalogItem.images
                && activeCatalogItem.images.length > 0;

            setItemEdit({...activeCatalogItem});
            setUnitPrice(activeCatalogItem.unitPrice);
            setUpLoadImage(imageUrl);
            setColorRgb(rgbData);
            setUpLoadImageMetadata(metaUpload);
            setWillFitWidth(imageIsConfig &&
                activeCatalogItem.images[0].willFitWidth);
        }
    });

    return(
        <div className={classes.textBox}>
            <Paper className={classes.paperEntryContainer}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={itemEdit.status === "active"}
                            onChange={(event)=> {
                                const newStatus = event.target.checked ?
                                    "active" : "disabled";
                                onValueChange("status",newStatus);
                            }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label="Active"
                />

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
                    value={unitPrice || ""}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">$</InputAdornment>
                    }}
                    onChange={(event) => {
                        setUnitPrice(event.target.value);
                        onValueChange("unitPrice", parseFloat(event.target.value));
                    }}
                />

                <TextField
                    style={{width:"32%"}}
                    label="Model #"
                    value={itemEdit.modelNumber || ""}
                    onChange={(event) => onValueChange("modelNumber", event.target.value)}
                />

                <TextField
                    style={{width:"100%"}}
                    multiline
                    rowsMax={4}
                    label="Description"
                    value={itemEdit.description}
                    onChange={(event) => onValueChange("description", event.target.value)}
                />

                <div>
                {categoryList && categoryList.map((categoryRef)=> {
                    const itemCategory = itemEdit.categories.find((itemCat)=> itemCat._id === categoryRef._id );
                    //debugger;
                    return(
                        <FormControlLabel
                            key={categoryRef._id}
                            control={
                                <Checkbox
                                    checked={itemCategory !== undefined}
                                    onChange={(event)=> {
                                        const newStatus = event.target.checked ?
                                            "active" : "disabled";

                                    }}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label={categoryRef.category}
                        />
                    )
                })}

                </div>

            {!catalogListLoading && !imageUploading &&
                <Fragment>
                    <Button
                        onClick={() => onSaveCatalogItem(itemEdit, uploadImageMetadata, willFitWidth, colorRgb, colorRgbOther)}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => onDeleteCatalog(itemEdit)}
                    >
                        Delete
                    </Button>
                </Fragment>
            }
            {catalogListLoading && <span>Saving...</span>}
            {imageUploading && <span>Uploading...</span>}

            <input type="file" name="myFile" id="myFile"
                   onChange={async (event) => {
                       console.log(event.target.files);
                       const reader = new FileReader();
                       /**
                        * @param {{target:object}} e
                        */
                       reader.onload = function(e) {
                           console.log("image read locally");
                           setUpLoadImage(e.target.result);
                       };
                       reader.readAsDataURL(event.target.files[0]);
                       const uploadResult = await onUploadImage(event.target.files[0], imageId);

                       if(uploadResult.uploadImageResult) {
                           setUpLoadImageMetadata(uploadResult.uploadImageResult);
                       }
                   }}
            />
            </Paper>
            {uploadImage !== null ?
            <PicRatioFill
                width={containerWidth}
                height={containerHeight}
                src={uploadImage}
                onChangeColors={(color)=>{
                    setColorRgb(color.colorRgb);
                    setColorRgbOther(color.colorRgbOpposite);
                    setWillFitWidth(color.willFitWidth);
                    //debugger;
                }}
            />
            : <img width={containerWidth}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOiSURBVHhe7do7SyNRGMbx/RyCYOv24n4GLSxdCxVRFLyiiZdEk3hL1gtYaGnh5QvYxjLp1aS0kU0hbAolsFgI6ruc4ytGk0myojOch+cHh3lnIkzxJ8PMxG9C0BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBuds4NnZWYlGoxVraWnp09fc3JxkMhk9s1ucDLy/vy+3t7e6549QKKSTW5wMfHR0JMU/Rd3zh7k6uMjNwMevgVtaWiSZTEosFrMrEU98ykolU9L6vdWewzCXahc5HzgcDtvtV9je3tZJZHFxUSe3OB94cnLSbr/C+vq6TgzsK6/A9/f3MjQ0ZG+IstmsHv04Bg6IV+CRkRGdREZHR3Wq7vr6WsbGxmR8fFxKpZIefYuBA+IVuHxOJBI6Vcrn8zI1NaV7Ij09PVL4XdC9VwwcEK/AZ2dnMjw8LJFIRPb29vToWxcXFxIKVz7T9vf3V0Rm4IB89CYrn8vbN2Be3kdm4IDUC/z09KTTK3NZNq8cjcfHR7utpq+vTwqF58gMHJD//Qbncrma39z3TOSbmxs+BwelXmBzN21egExPT8vV1ZXMz8/rJ40zd+GDg4O6x8C+qhW4q6tLp2dNTU12W+2yXU/7j3adGNhXXoE7Ozt1esvreD27u7s6MbCvygPPzMzYba2IDw8P0tHRoXveisWipNNp2dnZsc/RbW1t+gkD+6o88MTEhH1R0Yjun906iQ358k8C8XhcFhYW5PDw0D5Lm1eextbWlt0aDOyj8sDNzc12W89p+tReznt7eyWVSsn5+bl+4o2PSQEpD1zrd9qTkxOJRCOysrIil5eXerRxq6urOjGwr8oDm3jmMmsCvF9ra2uyubkpG782ZHl5uerf1Fsv+IO/jw4ODuTu753u+YOBfWR+6x0YGLB3uuZb9vLvOl+1zHnM+VzkZGBqHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYHAODY2BwDAyOgcExMDgGBsfA4BgYmsg/zgu6X0Ra40gAAAAASUVORK5CYII=" />
}
        </div>
    )
};


export const CatalogItemEdit = connectArray(CatalogItemEditComponent,
    [catalogModel, categoryModel]);

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
    },
    paperEntryContainer: {
        '& > *': {
            margin: 7,
        },
        padding: 10,
        width: "100%",
        marginBottom: 15,
        backgroundColor: "#f2f0ea"
    }
});