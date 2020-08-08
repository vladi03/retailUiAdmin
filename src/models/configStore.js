const configStore = {
    apiToken: ""
};

if(process.env.NODE_ENV === "development"){

}

export const getConfig = () => {
    return configStore;
};

export const setApiToken = (token) => configStore.apiToken = token;
