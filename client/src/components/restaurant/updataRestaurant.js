import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import InputTextField from "../utils/inputTextField";
import {getRestaurantAction, registerRestaurantAction, updateRestaurantAction} from "../../actions/restaurantAction";
import {useParams} from 'react-router-dom';

const RestaurantUpdate = (props)=>{
    const {restaurantId} = useParams();
    const {restaurant} = props;
    const [state , setState] = useState({
        name :restaurant.name,
        description :restaurant.description,
        address :restaurant.address,
        contactNumber :restaurant.contactNumber,
        status : restaurant.status,
        imageUrl : restaurant.imageUrl,
        errors : props.errors,
        userId : props.user._id
    })



    const [loading , setLoading] = useState(true);
    const errors = state.errors;
    const {updateRestaurantAction , getRestaurantAction} = props;

    useEffect(()=>{
        async function fetch(callBack) {
            await getRestaurantAction(restaurantId);
            callBack(false);
        }
        fetch(setLoading);
        setState({
            name :restaurant.name,
            description :restaurant.description,
            address :restaurant.address,
            contactNumber :restaurant.contactNumber,
            status : restaurant.status,
            imageUrl : restaurant.imageUrl,
            errors : props.errors,
            userId : props.user._id
        })
    } , [])


    useEffect(()=>{
        setState({
            ...state,
            errors : props.errors
        })
    } , [props.errors])


    const handleOnChange=(e)=>{
        const {name , value} = e.target;
        setState({
            ...state,
            errors : {},
            [name]:value
        })
    }

    console.log(props.restaurant)
    return (
        <div className="register">
            {loading ? <h1>Loading</h1>:<div className="container box bg-light p-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit</h1>
                        <p className="lead text-center">Update your restaurant</p>
                        <InputTextField
                            name = "name"
                            placeholder="Name"
                            value = {state.name}
                            error = {errors.name}
                            onChange={(e)=>handleOnChange(e)}
                        />
                        <InputTextField
                            name = "description"
                            placeholder="Description"
                            value = {state.description}
                            error = {errors.description}
                            onChange={(e)=>handleOnChange(e)}
                        />
                        <InputTextField
                            name = "address"
                            placeholder="Address"
                            value = {state.address}
                            error = {errors.address}
                            onChange={(e)=>handleOnChange(e)}
                        />
                        <InputTextField
                            name = "contactNumber"
                            placeholder="Contact Number"
                            value = {state.contactNumber}
                            error = {errors.contactNumber}
                            onChange={(e)=>handleOnChange(e)}
                        />
                        <InputTextField
                            name = "imageUrl"
                            placeholder="Image URL"
                            value = {state.imageUrl}
                            error = {errors.imageUrl}
                            onChange={(e)=>handleOnChange(e)}
                        />
                        <div className="form-group">
                            <select className = "form-control form-control-lg"
                                    name = "status"
                                    value = {state.status}
                                    onChange={(event)=>handleOnChange(event)}>
                                <option value = "open" >Open</option>
                                <option value = "closed" >Closed</option>
                                <option value = "not-accepting-orders" >Not Accepting Order</option>
                            </select>
                        </div>
                        <input type="button" value="Submit" onClick={()=>updateRestaurantAction(state,restaurantId)} className="btn btn-info btn-block mt-4"/>
                    </div>
                </div>
            </div>}
        </div>
    )
}



const mapStateToProps = (state)=>({
    errors : state.errors,
    user : state.auth.user,
    restaurant : state.restaurantData.restaurant,
})
export default connect(mapStateToProps , {
    updateRestaurantAction,
    getRestaurantAction
})(RestaurantUpdate)