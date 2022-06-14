import React from 'react';
import AccountModel from "./models/accounts/accountModel";
import {catalogModel} from "./models/home/catalogModel";
import {categoryModel} from "./models/home/categoryModel";
import {companyLocationModel} from "./models/company/companyLocationsModel";
import {statsModel} from "./models/stats/statsModel";
import {salesSearchModel} from "./models/sales/salesSearchModel";
import {salesHistModel} from "./models/sales/salesHistModel";

export const GlobalProviders = ({children}) => {

    return (
        <AccountModel.ModelProvider>
            <catalogModel.ModelProvider>
                <categoryModel.ModelProvider>
                    <companyLocationModel.ModelProvider>
                        <statsModel.ModelProvider>
                            <salesSearchModel.ModelProvider>
                                <salesHistModel.ModelProvider>
                        {children}
                                </salesHistModel.ModelProvider>
                            </salesSearchModel.ModelProvider>
                        </statsModel.ModelProvider>
                    </companyLocationModel.ModelProvider>
                </categoryModel.ModelProvider>
            </catalogModel.ModelProvider>
        </AccountModel.ModelProvider>
    );
};
