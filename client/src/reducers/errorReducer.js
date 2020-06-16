import {CLEAR_ERRORS, GET_ERROR} from "../actionTypes";

const initialState = {};
export default (state=initialState , {payload , type})=>{
    switch (type) {
        case GET_ERROR : return payload;
        case CLEAR_ERRORS : return initialState;
        default : return state
    }
}