import {TEST_DISPATCH, GET_ERRORS} from "./types";
import {setAuthToken} from "../utils/setAuthToken";
import axios from 'axios';
import jwtDecode from "jwt-decode";

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

/*
@function: action

*/
export const loginUser = userData => dispatch => {

    axios
        .post("/api/users/login", userData)
        .then(res => {
            //* save to local storage
            const {token} = res.data;

            //* set tokent o localstorage
            localStorage.setItem('jwtToken', token); //onmly stores as a string
            //*SEt token to Auth header
            setAuthToken(token);

            //* Extract the user from the bearer token

            debugger;
        })
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))

};