import React from 'react';
import AccountModel from "./models/accounts/accountModel";
import {catalogModel} from "./models/home/catalogModel";
import {categoryModel} from "./models/home/categoryModel";
import {companyLocationModel} from "./models/company/companyLocationsModel";
import {statsModel} from "./models/stats/statsModel";

export const GlobalProviders = ({children}) => {

    return (
        <AccountModel.ModelProvider>
            <catalogModel.ModelProvider>
                <categoryModel.ModelProvider>
                    <companyLocationModel.ModelProvider>
                        <statsModel.ModelProvider>
                        {children}
                        </statsModel.ModelProvider>
                    </companyLocationModel.ModelProvider>
                </categoryModel.ModelProvider>
            </catalogModel.ModelProvider>
        </AccountModel.ModelProvider>
    );
};
