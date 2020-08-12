import React from 'react';
import AccountModel from "./models/accounts/accountModel";
import {catalogModel} from "./models/home/catalogModel";

export const GlobalProviders = ({children}) => {

    return (
        <AccountModel.ModelProvider>
            <catalogModel.ModelProvider>
                        {children}
            </catalogModel.ModelProvider>
        </AccountModel.ModelProvider>
    );
};
