import { createContext } from "../../utility/modelContext";
import  {getUserList} from "./userMessages";

let provider = null;

// noinspection JSUnusedGlobalSymbols
export const createModel = () => ({
    users: [],
    usersLoading : false,
    usersDataInitialized: false,
    usersLoaded : false,
    usersHasError : false,
    usersMessage : "",
    usersLoadMessageDetail: "",
    userSelected:null,

    onLoadUsers,
    onSelectUser
});



export const  getInitialState = (classInstance) => {
    provider = classInstance;
    onLoadUsers();
    return  createModel();
};

const onLoadUsers = () => {
    provider.setState({usersLoading : true, usersDataInitialized: true });
    getUserList().then((result) => {
        provider.setState(result);
    });
};

const onSelectUser = (itemTarget) => {
    provider.setState({userSelected : itemTarget});
};

export const usersModel = createContext(createModel, getInitialState);
export default usersModel;
