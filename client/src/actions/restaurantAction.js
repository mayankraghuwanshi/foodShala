import axios from 'axios';
import {URL} from '../constants'
import {DELETE_RESTAURANT, GET_ALL_RESTAURANTS, GET_ERROR, GET_RESTAURANT} from "../actionTypes";


export const registerRestaurantAction=(restaurant)=>dispatch=>{
    axios.post(URL+"/api/restaurants" , restaurant)
        .then(data=>{
            window.location.href = "/#/restaurants/get/"+data.data._id;
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

export const getAllRestaurantsAction = ()=>dispatch=>{
    axios.get(URL+"/api/restaurants")
        .then(data=>{
            dispatch({
                type : GET_ALL_RESTAURANTS,
                payload : data.data
            })
        })
        .catch(err=>{
            console.error(err);
        })
}

export const deleteRestaurantAction=(id)=>dispatch=>{
    axios.delete(URL+"/api/restaurants/"+id)
        .then(data=>{
            if(data.data.success){
                dispatch({
                    type : DELETE_RESTAURANT,
                    payload : id
                })
            }
        })
        .catch(err=>{
            if(err.response.data.errors){
                dispatch({
                    GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        })
}

export const getRestaurantAction=(id)=>dispatch=>{
    axios.get(URL+"/api/restaurants/"+id)
        .then(data=>{
            dispatch({
                type : GET_RESTAURANT,
                payload : data.data
            })
        })
        .catch(err=>{
            console.error(err)
            if(err.response.data.errors){
                dispatch({
                    type:GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        })
}

export const updateRestaurantAction=(restaurant,restaurantId)=>dispatch=>{
    axios.patch(URL+"/api/restaurants/"+restaurantId, restaurant)
        .then(data=>{
            window.location.href="/#/restaurants/get/"+restaurant._id;
        })
        .catch((err=>{
            if(err.response.data.errors){
                dispatch({
                    type : GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        }))
}