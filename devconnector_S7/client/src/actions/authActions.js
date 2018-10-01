import {TEST_DISPATCH, GET_ERRORS, SET_CURRENT_USER} from "./types";
import setAuthToken from "../utils/setAuthToken";
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

            const decoded = jwtDecode(token);

            //* set current User

            dispatch(setCurrentUser(decoded));

            debugger;
        })
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))

};

//* set logged in user

/*
@function: setCurrentUser
@desc: Dispatch set current user with the payload
*/
export const setCurrentUser = decoded => {
    //dispatch to reducer
    return {type: SET_CURRENT_USER, payload: decoded}
}
