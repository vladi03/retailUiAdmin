import React from 'react';
import AccountModel from "./models/accounts/accountModel";
import {catalogModel} from "./models/home/catalogModel";
import {categoryModel} from "./models/home/categoryModel";

export const GlobalProviders = ({children}) => {

    return (
        <AccountModel.ModelProvider>
            <catalogModel.ModelProvider>
                <categoryModel.ModelProvider>
                        {children}
                </categoryModel.ModelProvider>
            </catalogModel.ModelProvider>
        </AccountModel.ModelProvider>
    );
};
