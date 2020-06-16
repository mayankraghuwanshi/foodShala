import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import InputTextField from "../utils/inputTextField";
import {registerRestaurantAction} from "../../actions/restaurantAction";

const RestaurantRegister = (props)=>{

    const [state , setState] = useState({
        name : "",
        description : "",
        address : "",
        contactNumber : "",
        status : "open",
        errors : props.errors,
        userId : props.user._id
    })
    const errors = state.errors;
    const {registerRestaurantAction} = props;

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

    return (
        <div className="register">
            <div className="container box">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your foodShala account</p>
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
                        <input type="button" value="Submit" onClick={()=>registerRestaurantAction(state)} className="btn btn-info btn-block mt-4"/>
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state)=>({
    errors : state.errors,
    user : state.auth.user
})
export default connect(mapStateToProps , {
    registerRestaurantAction
})(RestaurantRegister)