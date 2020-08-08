import React from "react";
import PropTypes from 'prop-types';
import {MenuList, MenuItem, IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Close} from "@material-ui/icons";
import {getItemPropertyValue} from "../../helpers";
import {ListNoData} from "../NoData";

const style = ()=> ({
        iconRight: {
            position: "absolute",
            right: 5,
            top:  -5
        },
        textDisplay :{
            maxWidth: "calc(100% - 50px)",
            overflow: "hidden",
            fontSize:14
        },
        itemContainer: {
            paddingTop: 4,
            paddingBottom: 4,
            minHeight: 20,
            backgroundColor: "#f1efef",
            border: "whitesmoke 3px solid"
        },
        listContainer :{
            display:"flex",
            flexWrap: "wrap"
        }
    }
);

export const SelectedListAcrossComponent = ({items, displayField, onRemove, buttonWidth, classes, noDataText}) => {

    return (
            <MenuList>
                <ListNoData dataCount={items.length} containerClass={classes.listContainer} noDataText={noDataText}>
                    {items.map((item, index) => (
                        <MenuItem key={index} className={classes.itemContainer} style={{width: buttonWidth || "calc(20% - 38px)"}} >
                            <span className={classes.textDisplay}>{getItemPropertyValue(item, displayField)}</span>
                            <IconButton onClick={ ()=> onRemove(item)}
                                        className={classes.iconRight}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </MenuItem>
                    ))}
                </ListNoData>
            </MenuList>
    );
};

SelectedListAcrossComponent.propTypes = {
    items: PropTypes.array.isRequired,
    displayField: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.func.isRequired
    ]),
    onRemove: PropTypes.func,
    buttonWidth: PropTypes.string
};

export const SelectedListAcross = withStyles(style)(SelectedListAcrossComponent);