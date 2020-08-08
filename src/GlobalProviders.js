import React from 'react';
import AccountModel from "./models/accounts/accountModel";

export const GlobalProviders = ({children}) => {

    return (
        <AccountModel.ModelProvider>
                        {children}
        </AccountModel.ModelProvider>
    );
};
