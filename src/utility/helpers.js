import {withStyles} from "@material-ui/styles";

export const connectArray = (component, arrayOfModels, styles = null) => {
    const intermediateComponents = [];
    const startComponent = styles !== null ?
        withStyles(styles)(component) : component;

    arrayOfModels.forEach((model, index) => {
        if(index === 0) {
            const newItem = (params) => model.connect(startComponent, params);
            intermediateComponents.push(newItem);
        } else {
            const newItem = (params) => model.connect(intermediateComponents[index - 1], params);
            intermediateComponents.push(newItem);
        }
    });

    return intermediateComponents[intermediateComponents.length - 1];
};

export const inTable = (onClickFunc) => {
    return (event, target) => {
        event.stopPropagation();
        onClickFunc(event, target);
    };
};

export const getItemPropertyValue = function (targetObject, fieldName) {
    let propValue = targetObject || "";

    if(typeof(fieldName) === 'function')
        propValue = fieldName(targetObject);
    else if(fieldName !== "") {
        const childFields = fieldName && fieldName.split('.') || [];
        //get to the property value by iterating through the object structure
        childFields.forEach((childField) => {
            propValue = propValue && propValue[childField];
        });
    }

    return propValue;
};

export const filterOutExistingByField = (fullList, existingList, fieldNameFull, fieldNameExisting) => {
    ///<summary>calculate remaining Ids.  Provide list of Ids and Object that has key field</summary>
    ///<param name="fullList" type="Array">Full List that you start out with</param>
    ///<param name="existingList" type="Array">List to filter out from full list</param>
    return Array.isArray(fullList) && fullList.filter(function (el) {
        const startValue = getItemPropertyValue(el, fieldNameFull);
        for (let iExisting = 0; iExisting < (Array.isArray(existingList) ? existingList.length : 0); iExisting++) {
            const existingField = fieldNameExisting || fieldNameExisting === "" ? fieldNameExisting : fieldNameFull;
            const existingValue = getItemPropertyValue(existingList[iExisting], existingField);
            if (startValue === existingValue)
                return false;
        }
        return true;
    }) || [];
};

export const filterOutExistingByArrayId = (fullList, existingList, fieldNameFull) => {
    ///<summary>calculate remaining Ids.  Provide list of Ids to exclude</summary>
    ///<param name="fullList" type="Array">Full List that you start out with</param>
    ///<param name="existingList" type="Array">List to filter out from full list</param>
    return Array.isArray(fullList) && fullList.filter(function (el) {
        const startValue = getItemPropertyValue(el, fieldNameFull);
        for (let iExisting = 0; iExisting < (Array.isArray(existingList) ? existingList.length : 0); iExisting++) {
            const existingValue = existingList[iExisting];
            if (startValue === existingValue)
                return false;
        }
        return true;
    }) || [];
};

export function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const handleResponse = () => {
    return function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.status);
    };
};

export const  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
};
