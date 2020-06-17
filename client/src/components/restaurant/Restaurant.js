import React, {useEffect, useState} from "react";
import './restaurant.css'
import {connect} from "react-redux";
import Rating from "../utils/ratingComponent";
import {Link, useParams} from 'react-router-dom'
import {getRestaurantAction} from "../../actions/restaurantAction";
import {addToCartAction} from "../../actions/cartAction";


const RestaurantWithMenu =(props)=>{
    const {restaurantId}  = useParams()
    const {getRestaurantAction , auth , addToCartAction} =  props;
    const [loading , setLoading] = useState(true);

    const {restaurant} = props;
    const recipes = (restaurant.menu ? restaurant.menu:[]);

    useEffect(()=>{
        async function fetch(setLoading) {
           await getRestaurantAction(restaurantId);
           await setLoading(false);
        }
        fetch(setLoading);
    },[restaurantId])


    return (
        <div>
            {loading ? <div><h1>Loading</h1></div> : <div>
                <div className="container">
                    <div className="row center">
                        <div className="col-md-8">
                            <div className="card card-body bg-light m-1">
                                <div className="row">
                                    <div className="col">
                                        <img width='400px' className="img-thumbnail" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
                                    </div>
                                    <div className="col">
                                        <h1>{restaurant.name}</h1>
                                        <Rating/>
                                        <p><i className="fas fa-utensils">&nbsp;</i>{restaurant.description}</p>
                                        <p><i className="fas fa-map-marked-alt">&nbsp;</i>{restaurant.address}</p>
                                        <p><i className="far fa-address-book">&nbsp;</i>{restaurant.contactNumber}</p>
                                        {auth.isAuthenticated ? (auth.user.role==="admin" || auth.user.role==="owner") ?<Link to={`/recipes/register/${restaurantId}`}><button className="btn btn-primary">Add menu</button></Link> : "" : "" }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 align="center">Menu</h3>
                <Recipes recipes = {recipes} addToCartAction={addToCartAction} auth = {auth}/>
            </div>}
        </div>
    )
}

const Recipe =(props)=>{
    const {recipe , addToCartAction , auth} = props;
    return (
        <div className="card card-body bg-light m-1">
            <div className="row">
                <div className="col">
                    <img width="200px" height="auto" className="rounded-circle img-thumbnail" src={recipe.imageUrl}/>
                </div>
                <div className="col">
                    <h3>{recipe.name}</h3>
                    <p>{recipe.description}</p>
                    <p><i className="fas fa-rupee-sign"></i>{recipe.price}</p>
                    <a className="badge badge-success">{recipe.mealType}</a><br/>
                </div>
                <div className="col">
                    {auth.isAuthenticated ? <button type="button" onClick={()=>addToCartAction(recipe)} className="btn btn-primary">Add to cart</button> : ""}
                </div>
            </div>
        </div>
    )
}


const Recipes =(props)=>{
    const {recipes,addToCartAction , auth} = props;
    return (
        <div className="container">
            <div className="row center">
                <div  className="col-md-8">
                    {
                        recipes.map((recipe , key)=>(
                            <Recipe
                                recipe = {recipe}
                                addToCartAction={addToCartAction}
                                auth = {auth}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({
    restaurant : state.restaurantData.restaurant,
    auth : state.auth
})

export default connect(mapStateToProps,{
    getRestaurantAction,
    addToCartAction,

})(RestaurantWithMenu)