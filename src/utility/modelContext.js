import React from "react";

export const createContext = (createModel, getInitialState) => {
    const ModelContext = React.createContext(createModel());

    class ModelProvider extends React.Component {
        /** @param props.match.params.testMode */
        constructor(props) {
            super(props);
            const testMode = props && props.match && props.match.params && props.match.params.testMode
                                && props.match.params.testMode.indexOf("testMode") > -1 && props.match.params.testMode;
            this.state = getInitialState(this, testMode || "");
        }

        render() {
            return (
                <ModelContext.Provider value={this.state}>
                    {this.props.children}
                </ModelContext.Provider>
            )
        }
    }

    const connect =(UserComponent, componentProps) => {
        return (
            <ModelContext.Consumer>
                {(vm) => (
                    <UserComponent {...vm} {...componentProps} />
                )}
            </ModelContext.Consumer>
        );
    };


    // noinspection JSUnusedGlobalSymbols
    return { ModelContext, ModelProvider, connect };
};