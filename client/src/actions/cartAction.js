import axios from 'axios';
import {URL} from "../constants";
import {ADD_ITEM_TO_CART, CLEAR_CART} from "../actionTypes";

export const addToCartAction = (recipe , ownerId)=>dispatch=>{
    recipe.count=1;
    const payload = {
        recipe,
        ownerId
    }

    window.alert(recipe.name+" added to cart.")
    dispatch({
        type : ADD_ITEM_TO_CART,
        payload
    })
}

export const orderAction=(cart, customerId)=>dispatch=>{
    console.log(cart);
    const {ownerId} = cart;
    axios.post(URL+"/api/orders/"+ownerId , {cart,customerId} )
        .then(data=>{
            dispatch({
                type : CLEAR_CART,
            })
            window.location.href = "/#/orders"
        })
        .catch(err=>{
            console.log(err);
        })
}

