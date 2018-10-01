import {TEST_DISPATCH, SET_CURRENT_USER} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    itAuthenticated: false,
    user: {}

}

/*
@function: authReducer
*/
export default function (state = initialState, action) {

    const {type} = action;

    //TODO: Switch between actions

    switch (type) {

            //*Fill user with payload
        case TEST_DISPATCH:

            return {
                ...state,
                user: action.payload
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload)
            }
        default:

            return state;

    }

}