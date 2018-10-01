import {TEST_DISPATCH, GET_ERRORS} from "./types";
import axios from 'axios';

//TODO: Export auth actions thunk waits for async data to dispatch
export const registerUser = (userData, history) => dispatch => {

    axios
        .post('/api/users/register', userData)
        .then(res => {
            //TODO: If passes; redirect us to login
            history.push("/login");
        })
        .catch(err => {

            dispatch({type: GET_ERRORS, payload: err.response.data});

        });

}