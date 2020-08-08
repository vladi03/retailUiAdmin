import React from "react";
import PropTypes from 'prop-types';
import {SelectSearch, SelectedList, SpinnerDownloading} from "../";

export const SelectMultiple = ({loading, itemOptions, itemsSelected, label, displayField, keyField,
                                    onAddItem, onRemoveItem, topControl, maxHeight
                               }) => {

    return (
        <SpinnerDownloading loading={loading} spinnerSize={30}>
            <SelectSearch options={itemOptions}
                          label={label}
                          displayField={displayField}
                          showFullList={true}
                          keyField={keyField}
                          onChange={(item) => onAddItem(item)}
                          topControl={topControl}
            />

            <SelectedList items={itemsSelected}
                          displayField={displayField}
                          onRemove={(item) => onRemoveItem(item)}
                          maxHeight={maxHeight || 160}
            />
        </SpinnerDownloading>
    );
};

SelectMultiple.propTypes = {
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