import axios from 'axios';
import {URL} from '../constants';
import {GET_ERROR, GET_ORDERS} from "../actionTypes";

export const getOrdersActionForOwner = (id) => dispatch=>{
    axios.get(URL+"/api/orders/owner/"+id)
        .then(data=>{
            dispatch({
                type : GET_ORDERS,
                payload : data.data
            })
        })
        .catch(err=>{
            if(err.response.data.errors){
                dispatch({
                    type : GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        })
}



export const getOrdersActionForCustomer = (id) => dispatch=>{
    axios.get(URL+"/api/orders/customer/"+id)
        .then(data=>{
            dispatch({
                type : GET_ORDERS,
                payload : data.data
            })
        })
        .catch(err=>{
            if(err.response.data.errors){
                dispatch({
                    type : GET_ERROR,
                    payload : err.response.data.errors
                })
            }
        })
}