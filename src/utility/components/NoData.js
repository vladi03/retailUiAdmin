import React from "react";
import { Chip, Avatar, ListItem, ListItemText } from "@material-ui/core";
import { LibraryBooks } from "@material-ui/icons";

export const NoData = ({dataCount, children})=> (
        dataCount === 0 &&
        <Chip
            avatar={
                <Avatar>
                    <LibraryBooks />
                </Avatar>
            }
            label="No Data"
        />
                || children
);

export const ListNoData = ({dataCount, containerClass, className, children, noDataText})=> (
    <div className={containerClass}>
        {dataCount === 0 &&
            <ListItem className={className}>
                <ListItemText>
                <Chip
                    avatar={
                        <Avatar>
                            <LibraryBooks />
                        </Avatar>
                    }
                    label={noDataText || "No Data"}
                />
                </ListItemText>
            </ListItem>
        || children
        }
    </div>
);