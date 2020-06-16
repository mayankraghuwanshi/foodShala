import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import {restaurantReducer} from "./restaurantReducer";


export default combineReducers({

    auth : authReducer,
    errors : errorReducer,
    restaurantData : restaurantReducer


})