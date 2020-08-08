import React from "react";
import PropTypes from 'prop-types';
import {MenuList, MenuItem, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Close} from "@material-ui/icons";
import {getItemPropertyValue} from "../../helpers";
import {ListNoData} from "../NoData";

const useStyle = makeStyles({
        iconRight: {
            position: "absolute",
            right: 5,
            top: ({closeButtonTopOffset}) => closeButtonTopOffset || -7
        },
        textDisplay :{
            maxWidth: "calc(100% - 50px)",
            overflow: "hidden",
            fontSize:14
        },
        itemContainer: {
            minHeight: 20,
            paddingTop: 4,
            paddingBottom: 4
        }
    }
);

export const SelectedListComponent = ({items, displayField, onRemove, maxHeight, leftControls,
                                          closeButtonTopOffset
}) => {

    const classes = useStyle({closeButtonTopOffset});


    return (
        <div style={{maxHeight: maxHeight, overflow:"auto"}}>
            <MenuList>
                <ListNoData dataCount={items.length}>
                    {items.map((item, index) => (
                        <MenuItem key={index} className={classes.itemContainer}>
                            {leftControls && leftControls(item, index)}
                            <span className={classes.textDisplay}>{getItemPropertyValue(item, displayField)}</span>
                            <IconButton onClick={ ()=> onRemove(item)}
                                        className={classes.iconRight}
                            >
                                <Close/>
                            </IconButton>
                        </MenuItem>
                    ))}
                </ListNoData>
            </MenuList>
        </div>
    );
};

SelectedListComponent.propTypes = {
    items: PropTypes.array.isRequired,
    displayField: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.func.isRequired
    ]),
    onRemove: PropTypes.func,
    maxHeight: PropTypes.number
};

export const SelectedList = SelectedListComponent;