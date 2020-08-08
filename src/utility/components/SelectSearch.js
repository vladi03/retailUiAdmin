import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormControl, InputLabel, MenuList, MenuItem, Popper, ClickAwayListener,
    Grow, Paper, InputAdornment, Typography
} from '@material-ui/core';
import {withStyles} from "@material-ui/styles";
import { Search, ArrowDropDown, ArrowDropUp
} from '@material-ui/icons';
import { getItemPropertyValue } from "../helpers";

class SelectSearchComponent extends React.Component {
    constructor(props) {
        super();
        const maxOptions = props.maxArrayLength || 7;
        this.optionActiveRef = React.createRef();
        this.state = {
            showFullList: props.showFullList || false,
            showDropDown: props.showDropDown || false,
            searchString: "",//this.searchOptions(props.options, props.keyField, props.displayField, props.selected),
            filteredPageOptions: props.options.slice(0,7),
            filteredAllOptions: props.options,
            autoFocus: props.autoFocus,
            hasFocusOptionList: false,
            hasFocusTextBox: false,
            selectedIndex: 0,
            maxArrayLength: maxOptions,
            anchorEl: null
        };
    }

    static getValueDisplay(props) {
        const searchSelectedItem =props.selected && props.options.filter(item => {
            return item[props.keyField] === props.selected[props.keyField]
        }) || [];
        return searchSelectedItem.length > 0 ? searchSelectedItem[0][props.displayField] : "";
    }

    onShowDropDown(event) {
        // noinspection JSCheckFunctionSignatures
        this.setState({anchorEl: event.currentTarget, showDropDown: true, filteredPageOptions: this.props.options.slice(0,7), filteredAllOptions: this.props.options});
    }

    hideDropDown() {
        // noinspection JSCheckFunctionSignatures
        this.setState({showDropDown: false});
    }
    /**
     * @param {{keyCode:int}} e
     */
    onKeyPress(e){

        if(e.keyCode === 13){
            if(!this.state.showFullList && this.state.filteredPageOptions.length > this.state.selectedIndex) {
                this.onItemSelect(this.state.filteredPageOptions[this.state.selectedIndex]);
            }else if(this.state.showFullList) {
                this.onItemSelect(this.state.filteredAllOptions[this.state.selectedIndex]);
            }
        } else if(e.keyCode === 40) {

            if(this.state.showFullList && this.state.filteredAllOptions.length > this.state.selectedIndex + 1) {
                // noinspection JSCheckFunctionSignatures
                this.setState({selectedIndex: this.state.selectedIndex + 1});
                if(this.optionContainerRef && this.optionActiveRef) {
                    if (this.optionContainerRef.scrollTo)
                        this.optionContainerRef.scrollTo(0, this.optionActiveRef.offsetTop);
                    else if (this.optionContainerRef.scrollTop !== undefined)
                        this.optionContainerRef.scrollTop = this.optionActiveRef.offsetTop;
                }
            } if(!this.state.showFullList && this.state.filteredPageOptions.length > this.state.selectedIndex + 1) {
                // noinspection JSCheckFunctionSignatures
                this.setState({selectedIndex: this.state.selectedIndex + 1});
                if(this.optionContainerRef && this.optionActiveRef) {
                    if (this.optionContainerRef.scrollTo)
                        this.optionContainerRef.scrollTo(0, this.optionActiveRef.offsetTop);
                    else if (this.optionContainerRef.scrollTop !== undefined)
                        this.optionContainerRef.scrollTop = this.optionActiveRef.offsetTop;
                }
            }
        } else if(e.keyCode === 38) {
            if(this.state.selectedIndex  > 0) {
                // noinspection JSCheckFunctionSignatures
                this.setState({selectedIndex: this.state.selectedIndex - 1});
                if(this.optionContainerRef && this.optionActiveRef) {
                    if (this.optionContainerRef.scrollTo)
                        this.optionContainerRef.scrollTo(0, this.optionActiveRef.offsetTop-46);
                    else if (this.optionContainerRef.scrollTop !== undefined)
                        this.optionContainerRef.scrollTop = this.optionActiveRef.offsetTop-46;
                }
            }
        }


    }

    onSearchChange(value) {
        if(value !== "") {
            const filtered = value && value.toLowerCase ? this.props.options.filter(item => {
                return getItemPropertyValue(item,this.props.displayField).toLowerCase().indexOf(value.toLowerCase()) > -1;
            }) : [];
            // noinspection JSCheckFunctionSignatures
            this.setState({searchString: value, filteredPageOptions : filtered.slice(0,7), selectedIndex : 0,
                            filteredAllOptions: filtered});
        }
        else
            // noinspection JSCheckFunctionSignatures
            this.setState({searchString: value, filteredPageOptions : this.props.options.slice(0,7), selectedIndex : 0,
                            filteredAllOptions: this.props.options});
    }

    onItemSelect(item) {
        if(item) {
            this.props.onChange(item);
            // noinspection JSCheckFunctionSignatures
            this.setState({showDropDown: false, searchString: ""});
        }
    }

    onSetAnchor(ref) {
        if(this.state.anchorEl === null && ref != null)
        // noinspection JSCheckFunctionSignatures
            this.setState({anchorEl: ref});
    }

    render() {
        const valueDisplay = this.constructor.getValueDisplay(this.props);
        const { label, classes } = this.props;
        const {anchorEl, showDropDown} = this.state;

        const isShowDropDown = Boolean(anchorEl) && showDropDown;

        return (
            <div className={classes.root} >
                <FormControl style={{width:"100%"}}>
                    <ClickAwayListener onClickAway={() => this.hideDropDown()}>
                        <div>
                            {this.state.showDropDown ?
                                <FormControl style={{width:"100%"}}>
                                    {label && label.length > 0 &&
                                        <InputLabel htmlFor="age-simple">{label}</InputLabel>
                                    }

                                    <Input
                                        value={this.state.searchString}
                                        ref={(ref) => { this.onSetAnchor(ref); } }
                                        autoFocus={this.state.autoFocus}
                                        onChange={(event)=> this.onSearchChange(event.target.value)}
                                        onKeyDown={(event)=> this.onKeyPress(event)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Search style={{marginRight: 10}} color="primary" />
                                                { this.props.onClose &&
                                                    <ArrowDropUp style={{marginRight: 10, cursor:"pointer"}}
                                                                 color="primary"
                                                                 onClick={()=> this.props.onClose()}
                                                    />
                                                }
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                :
                                <FormControl style={{width:"100%"}}>
                                    {label && label.length > 0 &&
                                    <InputLabel htmlFor="age-simple">{label}</InputLabel>
                                    }
                                    <Input autoFocus={this.state.autoFocus}
                                        value={valueDisplay}
                                        onClick={(event) => this.onShowDropDown(event)}
                                        onKeyDown={(event) => this.onShowDropDown(event)}

                                        endAdornment={
                                            <InputAdornment position="end">
                                                <ArrowDropDown style={{marginRight: 10}} color="primary" />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            }

                            <Popper open={isShowDropDown}
                                    anchorEl={anchorEl}
                                    style={{position:"fixed", zIndex:9999}}
                                    transition disablePortal>

                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            {!this.state.showFullList &&
                                                <MenuList>
                                                    {this.props.topControl }
                                                    {this.state.filteredPageOptions.length > 0 &&
                                                        this.state.filteredPageOptions.map((item, index) =>
                                                            (
                                                                <MenuItem key={index}
                                                                          selected={index === this.state.selectedIndex}
                                                                          onClick={() => this.onItemSelect(item)}>
                                                                    {getItemPropertyValue(item, this.props.displayField)}
                                                                </MenuItem>
                                                            ))
                                                    }
                                                    {this.state.filteredPageOptions.length === 0 &&
                                                        <MenuItem>
                                                            No Data
                                                        </MenuItem>
                                                    }

                                                    {this.state.filteredPageOptions.length > 0 &&
                                                        this.state.maxArrayLength === this.state.filteredPageOptions.length &&
                                                            <Typography
                                                                color="textSecondary"
                                                                className={classes.noOptionsMessage}
                                                            >
                                                                ...
                                                            </Typography>
                                                    }
                                                </MenuList>
                                            }

                                            {this.state.showFullList &&
                                                <div style={{maxHeight: 300, maxWidth: 300, overflow:"auto"}}
                                                     ref={ (ref) => { this.optionContainerRef = ref; } }
                                                >
                                                <MenuList >
                                                    {this.props.topControl }
                                                    {this.state.filteredAllOptions.length > 0 &&
                                                        this.state.filteredAllOptions.map((item, index) =>
                                                        (
                                                            index === this.state.selectedIndex ?
                                                                <span key={index} ref={ (ref) => { this.optionActiveRef = ref; } } >
                                                                <MenuItem

                                                                          selected={index === this.state.selectedIndex}
                                                                          onClick={() => this.onItemSelect(item)}>
                                                                    {getItemPropertyValue(item, this.props.displayField)}
                                                                </MenuItem>
                                                                </span>
                                                                :
                                                                <MenuItem key={index}
                                                                          selected={index === this.state.selectedIndex}
                                                                          onClick={() => this.onItemSelect(item)}>
                                                                    {getItemPropertyValue(item, this.props.displayField)}
                                                                </MenuItem>
                                                        ))
                                                    }
                                                    {this.state.filteredAllOptions.length === 0 &&
                                                        <MenuItem>
                                                            No Data
                                                        </MenuItem>
                                                    }
                                                </MenuList>
                                                </div>
                                            }
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </ClickAwayListener>
                </FormControl>
            </div>
        );
    }
}

SelectSearchComponent.propTypes = {
    displayField: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.func.isRequired
    ]),
    keyField: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    showFullList: PropTypes.bool,
    onClose: PropTypes.func,
    topControl: PropTypes.node
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 99999999,
        position: "relative"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: 56
    },
    noOptionsMessage: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
});

export const SelectSearch = withStyles(styles)(SelectSearchComponent);