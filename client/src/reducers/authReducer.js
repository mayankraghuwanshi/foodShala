import {SET_CURRENT_USER, LOG_OUT_USER} from "../actionTypes";
import {isEmpty} from "../helpers/isEmpty";

const initialState = {
    isAuthenticated : false,
    loading : false,
    user : {}
}
export default (state = initialState ,  {type , payload})=>{
    switch (type) {
        case SET_CURRENT_USER : return {
            ...state,
            loading: false,
            user : payload,
            isAuthenticated: !isEmpty(payload)
        }
        case LOG_OUT_USER : return {
            isAuthenticated: false,
            loading: false,
            user : {}
        }

        default : return state;
    }
}