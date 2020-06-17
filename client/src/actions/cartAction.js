import axios from 'axios';
import {URL} from "../constants";
import {ADD_ITEM_TO_CART} from "../actionTypes";

export const addToCartAction = (recipe)=>dispatch=>{
    recipe.count=1;
    window.alert(recipe.name+" added to cart.")
    dispatch({
        type : ADD_ITEM_TO_CART,
        payload : recipe
    })
}