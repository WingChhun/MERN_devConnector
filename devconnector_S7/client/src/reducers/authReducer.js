import {TEST_DISPATCH} from "../actions/types";

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

        default:

            return state;

    }

}