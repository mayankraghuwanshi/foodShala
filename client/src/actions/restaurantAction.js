import axios from 'axios';
import {URL} from '../constants'
import {GET_ERROR} from "../actionTypes";


export const registerRestaurantAction=(restaurant)=>dispatch=>{
    axios.post(URL+"/api/restaurants" , restaurant)
        .then(data=>{
            window.alert(data);
        })
        .catch(err=>{
            if(err.response.data.errors){
                console.log(err.response.data.errors);
                dispatch({
                    type : GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        })
}