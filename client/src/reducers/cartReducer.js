import {ADD_ITEM_TO_CART, CLEAR_CART} from "../actionTypes";

const initialState = {
    items :[],
    itemSize : 0,
    totalPrice : 0,
    ownerId: 0
}

export const cartReducer = (state = initialState , {payload , type})=>{
    switch (type) {
        case ADD_ITEM_TO_CART : {
            const {recipe , ownerId} = payload;
            let items = state.items;
            let totalPrice = state.totalPrice
            let itemSize = state.itemSize;
            let flag = true;
            for(let i=0;i<items.length;i++){
                if(items[i]._id===recipe._id){
                    items[i].count+=1;
                    totalPrice+=items[i].price;
                    itemSize+=1;
                    flag = false;
                    break;
                }
            }
            if(flag){
                items.push(recipe);
                totalPrice+=recipe.price;
                itemSize++;
            }

            return {
                items: items,
                itemSize: itemSize,
                totalPrice: totalPrice,
                ownerId

            }
        }
        case CLEAR_CART: return {
            items : [],
            itemSize: 0,
            totalPrice: 0,
            ownerId: 0
        }
        default : return state;
    }
}