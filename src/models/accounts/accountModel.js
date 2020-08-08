import { createContext } from "../../utility/modelContext";
import {setToken, getStore, isLoggedIn} from "./userAuthStore";
import {b64toBlob} from "../../utility/helpers";
import {createUserApi, checkUserFace, getUserAccountPassword} from './userMessages';
let provider = null;

export const createModel = () => {
    const userStore = getStore();
    return {
        userNotAuthorized: false,
        userLoggedIn: isLoggedIn(),
        firstName: userStore.firstName,
        lastName: userStore.lastName,
        picUrl: userStore.picUrl,
        userFeatures: userStore.featurePermissions ||[],
        faceLoginMessage:null,
        passwordMessage:'',
        confirmPasswordMessage:'',
        profileLoading: false,

        onSetAccount,
        onNotifyMainNavOfLogOff,
        onCreateProfile,
        onFaceLogin,
        checkPassword,
        clearPasswordMessage,
        onPasswordLogin

    };
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

const onNotifyMainNavOfLogOff = () => {
    //clearToken();
    provider.setState({userLoggedIn: false});
};

const onSetAccount = (loginInfo) => {


    if(loginInfo.token.indexOf(".") > -1 || true) {

        const tokenData = setToken(loginInfo);
        console.log("tokenData");
        console.log(tokenData);
        provider.setState({picUrl: loginInfo.picUrl,
            firstName: loginInfo.firstName, lastName: loginInfo.lastName, userName:loginInfo.userName,
            userFeatures: tokenData.features, userLoggedIn : true});
    } else
        provider.setState({userNotAuthorized : true, firstName: loginInfo.firstName, lastName: loginInfo.lastName});
};

const onCreateProfile = ({firstName, lastName, imageSrc, password, signatureSrc, userName}) => {
    const split = imageSrc.split(',');
    const profileImage = b64toBlob(split[1], 'image/jpeg');
    const sigSplit = signatureSrc.split(',');
    const signatureBlob = b64toBlob(sigSplit[1],'image/png');

    provider.setState({profileLoading:true});
    createUserApi(profileImage,'enroll',firstName, lastName,password, signatureBlob, userName ).then((result) =>{
        provider.setState(...result);
        onSetAccount(result);

    })
};

const onFaceLogin =(imageSrc) =>{
    const split = imageSrc.split(',');
    const image = b64toBlob(split[1], 'image/jpeg');
    provider.setState({profileLoading:true});
    checkUserFace(image,'login').then((result)=>{
        console.log(result);
        if(!result.token ){
            provider.setState({...result,faceLoginMessage:'No User Found, please try again or Create account'})
        }else if (result.token){
            onSetAccount(result);
            provider.setState({...result,faceLoginMessage:''})



        }
    })

};
const onPasswordLogin =({userName, password}) =>{
    provider.setState({profileLoading:true});

    getUserAccountPassword(userName, password).then((result)=>{
        provider.setState({...result,passwordMessage:''});

        onSetAccount(result);
    }).catch(error => provider.setState({passwordMessage:'UserName or Password Incorrect'}))

};

const checkPassword = (password, confirmPassword) => {
        const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/;

        if ((password.match(passw)) && (confirmPassword === password)) {
            provider.setState({passwordMessage: '', confirmPasswordMessage: ''});
            return true;
        } else {
            (password.match(passw)? provider.setState({passwordMessage: ''}):
                provider.setState({passwordMessage: 'Password needs to be 7 long characters with at least one numeric digit and a special character'}));

            ((confirmPassword === password)? provider.setState({confirmPasswordMessage: ''}):
                provider.setState({confirmPasswordMessage: 'Passwords do not match'}));

            return false;
        }



};
const clearPasswordMessage = () => {
    provider.setState({passwordMessage: '', confirmPasswordMessage: ''});
};

export default createContext(createModel, getInitialState);
