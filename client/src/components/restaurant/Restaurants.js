import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteRestaurantAction, getAllRestaurantsAction} from "../../actions/restaurantAction";
import Rating from "../utils/ratingComponent";
import {Link} from "react-router-dom";

const Restaurants = (props) => {

    const [loading , setLoading] = useState(true);
    const {restaurants , getAllRestaurantsAction,deleteRestaurantAction}  = props;
    const {isAuthenticated , user} = props.auth;


    useEffect(()=>{
        async function fetchAllRestaurants(setLoading){
            await getAllRestaurantsAction();
            await setLoading(false);
        }
        fetchAllRestaurants(setLoading);
    },[])

    return (
        <div className="container bg-light p-5">
            <div className="row">
                {loading ? <div><h1>loading</h1></div>:

                    restaurants.length>0?
                        restaurants.map((restaurant , key)=>(
                        <Restaurant
                        name = {restaurant.name}
                        description = {restaurant.description}
                        contactNumber = {restaurant.contactNumber}
                        address = {restaurant.address}
                        key = {key}
                        imageUrl = {restaurant.imageUrl}
                        isModificationAllow = {(isAuthenticated && user._id===restaurant.owner)}
                        deleteRestaurantAction = {deleteRestaurantAction}
                        restaurantId = {restaurant._id}
                        />
                        )):<div>
                            <h1 align="center">No restaurant found!</h1>
                        </div>
                }
            </div>
        </div>
    )
}


const Restaurant = (props)=>{
    const {deleteRestaurantAction,name , description , address ,imageUrl,contactNumber,restaurantId,isModificationAllow} = props;
    const handleOnDelete =(id)=>{
        if(window.confirm("Do you wanna delete this restaurant ?")){
            deleteRestaurantAction(restaurantId);
        }
    }
    const handleOnUpdate =()=>{

    }
    return (
        <div className="col-md-4">
            <div style={{
                margin : "10px 0 5px 0"
            }} className="card">
                <img className="card-img-top" src={imageUrl ? imageUrl : "https://hinterlandbeer.com/wp-content/themes/hinterland-qxz/images/Eats.jpg"}/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <Rating/>
                    <div style={{
                        marginTop : "10px"
                    }}>
                        <p><i className="fas fa-utensils">&nbsp;</i>{description}</p>
                        <p><i className="fas fa-map-marked-alt">&nbsp;</i>{address}</p>
                        <p><i className="far fa-address-book">&nbsp;</i>{contactNumber}</p>
                        {/*<p><i className="fas fa-motorcycle">&nbsp;</i> 10 min.</p>*/}
                    </div>
                    <a href={`/#/restaurants/get/${restaurantId}`} className="btn btn-primary m-1">View</a>
                    {isModificationAllow ? (
                        <span>
                            <Link to={`/restaurants/update/${restaurantId}`} className="btn btn-info m-1">Edit</Link>
                            <a onClick={()=>handleOnDelete(restaurantId)} className="btn btn-danger m-1">Delete</a>
                        </span>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({
    restaurants : state.restaurantData.restaurants,
    auth : state.auth
})
export default connect(mapStateToProps,{
    getAllRestaurantsAction,
    deleteRestaurantAction
})(Restaurants)




