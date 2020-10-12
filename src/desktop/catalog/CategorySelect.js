import React, {useState, useEffect} from "react";
import {categoryModel} from "../../models/home/categoryModel";
import {SelectSearch} from "../../utility/components";
import {connectArray} from "../../utility/helpers";

export const CategorySelectComponent = ({categoryList, onChange,
                  categoryListInit, onCategoryListInit}) => {
    const [selected, setSelected] = useState(null);
    const modList = [{_id:null, category: "All"}, ...categoryList];
    useEffect(()=>{
        if(!categoryListInit)
            onCategoryListInit();
    });
    return (
        <SelectSearch
            label="Category"
            showFullList={true}
            options={modList}
            keyField={"_id"}
            displayField={"category"}
            onChange={(category) => {
                setSelected(category);
                if(onChange)
                    onChange(category);
            }}
            selected={selected}
        />
    )
};

export const CategorySelect = connectArray(CategorySelectComponent,
    [categoryModel]);