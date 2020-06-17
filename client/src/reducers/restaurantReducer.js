import {DELETE_RESTAURANT, GET_ALL_RESTAURANTS, GET_RESTAURANT} from "../actionTypes";


const initialState = {
    isLoading : false,
    restaurants:[],
    restaurant:{}
}

export const restaurantReducer =(state = initialState , {type , payload})=>{
        switch (type) {
            case GET_ALL_RESTAURANTS : return {
                ...state,
                isLoading: false,
                restaurants: payload
            }
            case DELETE_RESTAURANT : return {
                ...state,
                isLoading: false,
                restaurants: state.restaurants.filter(item=>item._id!==payload)
            }
            case GET_RESTAURANT : return {
                ...state,
                isLoading: false,
                restaurant: payload
            }
            default : return state;
        }
}