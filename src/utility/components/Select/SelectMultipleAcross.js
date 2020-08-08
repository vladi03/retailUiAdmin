import React from "react";
import PropTypes from 'prop-types';
import {SelectSearch, SpinnerDownloading} from "../";
import { SelectedListAcross} from "./SelectedListAcross";

export const SelectMultipleAcross = ({loading, itemOptions, itemsSelected, label, displayField, keyField,
                                   onAddItem, onRemoveItem, topControl, maxHeight, noDataText
                               }) => {

    return (
        <SpinnerDownloading loading={loading} spinnerSize={30}>
            <div style={{width:"25%"}}>
                <SelectSearch options={itemOptions}
                              label={label}
                              displayField={displayField}
                              showFullList={true}
                              keyField={keyField}
                              onChange={(item) => onAddItem(item)}
                              topControl={topControl}
                />
            </div>

            <SelectedListAcross items={itemsSelected}
                                displayField={displayField}
                                onRemove={(item) => onRemoveItem(item)}
                                maxHeight={maxHeight || 160}
                                noDataText={noDataText}
            />
        </SpinnerDownloading>
    );
};

SelectMultipleAcross.propTypes = {
    itemOptions: PropTypes.array.isRequired,
    itemsSelected: PropTypes.array.isRequired,
    displayField: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.func.isRequired
    ]),
    keyField: PropTypes.node.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};