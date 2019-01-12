import {get} from './localStorageManager';

export const isLoggedIn = () => {
    const token = get("token");
    return token ? true : false;
};

export const populateUserData = async () => {
    // fetch userdata and populate into store
    //
};