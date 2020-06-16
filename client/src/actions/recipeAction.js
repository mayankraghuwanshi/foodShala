import {URL} from '../constants';
import axios from 'axios';
import {GET_ERROR} from "../actionTypes";

export const registerRecipeAction = (recipe , restaurantId)=>dispatch=>{
    axios.post(URL+"/api/recipes/"+restaurantId ,  recipe)
        .then(data=>{
            console.log(data);
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