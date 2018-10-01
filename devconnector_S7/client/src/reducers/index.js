import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from "./errors";
//*Use combine reducers to combine into one to be exported
export default combineReducers({auth: authReducer, errors: errorReducer});