import Cookie from 'js-cookie';

export const isLoggedIn = () => {
    const token = Cookie.get('_session');
    return !!token;
};

export const populateUserData = async () => {
    // fetch userdata and populate into store
    //
};
