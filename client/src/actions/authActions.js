import axios from 'axios';
import {URL} from '../constants';
import {CLEAR_ERRORS, GET_ERROR, LOG_OUT_USER, SET_CURRENT_USER} from "../actionTypes";
import jwt_decode from 'jwt-decode';
import setAuthHeader from "../helpers/setAuthToken";



export const clearErrorAction =()=>dispatch=>{
    dispatch({
        type : CLEAR_ERRORS
    })
}

export const createUserAction = (user)=>dispatch=>{
    axios.post(URL+"/api/users/" , user)
        .then(data=>{
            window.alert("done");
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type : GET_ERROR,
                payload : err.response.data.errors
            })
        })
}

export const loginUserAction = (user)=>dispatch=>{
    axios.post(URL+"/api/users/login" , user)
        .then(data=>{
            const {token} = data.data;
            localStorage.setItem("jwtToken" , token)
            //set to authHeader
            setAuthHeader(token)
            //decode to get user
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded))
            window.alert("user has loged in successfully")

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

export const logOutuserAction=()=>dispatch=>{
    localStorage.removeItem('jwtToken')
    setAuthHeader(false)
    dispatch(setCurrentUser({}))
    window.location.href = "/#/login"
}

export const setCurrentUser=(decoded)=>{
    return{
        type: SET_CURRENT_USER,
        payload : decoded
    }
}