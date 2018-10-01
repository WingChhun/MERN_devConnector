import axios from 'axios';

/*
@function setAuthToken
@purpose: Will always set Auth token for any axios requests
*/

const setAuthToken = token => {
    if (token) {
        //Apply to every request

        axios.defaults.headers.common['Authorization'] = token;

    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;