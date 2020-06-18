import {GET_ORDERS} from "../actionTypes";

const initialState = {
    orders:[]
}

export const orderReducer =(state = initialState , {payload , type})=>{
    switch (type) {
        case GET_ORDERS : return {
            orders : payload
        }
        default : return state;

    }
}