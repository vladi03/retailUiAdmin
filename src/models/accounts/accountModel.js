import { createContext } from "../../utility/modelContext";
import {setUserData, getStore, isLoggedIn} from "./userAuthStore";
let provider = null;

export const createModel = () => {
    const userStore = getStore();
    console.log("isLoggedIn");
    console.log(isLoggedIn());

    return {
        loadingAuth: !isLoggedIn(),
        userNotAuthorized: false,
        userLoggedIn: isLoggedIn(),
        name: userStore.name,
        picUrl: userStore.picUrl,
        userFeatures: userStore.featurePermissions ||[],
        faceLoginMessage:null,
        passwordMessage:'',
        confirmPasswordMessage:'',
        profileLoading: false,
        onSetAccount,
        onNotifyMainNavOfLogOff
    };
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

const onNotifyMainNavOfLogOff = () => {
    provider.setState({userLoggedIn: false});
};

const onSetAccount = (loginInfo) => {
        console.log("loginInfo");
        console.log(loginInfo);
        setUserData(loginInfo);
        provider.setState({
            picUrl: loginInfo.picUrl,
            name: loginInfo.name,
            email:loginInfo.email,
            userLoggedIn : true});
};

export default createContext(createModel, getInitialState);
