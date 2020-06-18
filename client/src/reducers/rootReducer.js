import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import {restaurantReducer} from "./restaurantReducer";
import {cartReducer} from "./cartReducer";
import {orderReducer} from "./orderReducer";


export default combineReducers({

    auth : authReducer,
    errors : errorReducer,
    restaurantData : restaurantReducer,
    cart : cartReducer,
    order : orderReducer
})