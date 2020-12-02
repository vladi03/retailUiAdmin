import {createContext} from "../../utility/modelContext";

import {saveLocation, getLocationList,
    getNewLocation, deleteLocationRecord} from "./companyMessage";

let provider = null;

export const createModel = () => ({
    activeLocationItem: null,
    locationList: [],
    locationListLoading: false,
    locationListInit: false,
    onLocationListInit,
    onSetActiveLocationItem,
    onSaveLocationItem,
    onCreateNewLocation,
    onDeleteLocation
});

const onLocationListInit = () => {
    provider.setState({locationListInit: true});
    getLocationList().then((newState) => {
        provider.setState(newState);
    });
};

const onSetActiveLocationItem = (activeLocationItem) => {
    provider.setState({activeLocationItem});
};

const onSaveLocationItem = async (itemToSave) => {
    if(itemToSave.isNew)
        delete itemToSave.isNew;
    const result = saveLocation(itemToSave);
    result.locationList = provider.state.locationList.map((loc) =>
        loc._id === itemToSave._id ? itemToSave : loc);

    provider.setState(result);
};

const onCreateNewLocation = async () => {
    provider.setState({locationListInit: true});
    const result = await getNewLocation();

    result.locationList = [result.activeLocationItem, ...provider.state.locationList,
    ];

    provider.setState(result);
};

const onDeleteLocation = async (location) => {
    provider.setState({locationListLoading: true});
    const result = await deleteLocationRecord(location._id);

    result.locationList = provider.state.locationList.filter(
        (loc) => loc._id !== location._id
    );

    result.activeLocationItem = null;
    provider.setState(result);
};

export const  getInitialState = (classInstance) => {
    provider = classInstance;
    return  createModel();
};

export const companyLocationModel = createContext(createModel, getInitialState);
