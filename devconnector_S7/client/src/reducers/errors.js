import {GET_ERRORS} from "../actions/types";

const initialState = {}

/*
@function: authReducer
*/
export default function (state = initialState, action) {

    const {type} = action;

    //TODO: Switch between actions

    switch (type) {

            //*Fill user with payload
        case GET_ERRORS:

            return action.payload;

        default:

            return state;

    }

}