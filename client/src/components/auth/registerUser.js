import React, {useEffect, useState} from 'react';
import InputTextField from "../utils/inputTextField";
import {connect} from "react-redux";
import {clearErrorAction, createUserAction} from "../../actions/authActions";


const RegisterUser = (props) =>{

    const {createUserAction,clearErrorAction} = props;

    const [state , setState] = useState({
        name : "",
        email : "",
        password : "",
        role:"customer",
        preferredMeal : "veg",
        errors : props.errors
    })
    const errors = state.errors;

    const handleOnChange = (event)=>{
        const {name , value} = event.target;
        setState({
            ...state,
            errors : {},
            [name] : value
        });
    }

    useEffect(()=>{
        setState({
            ...state,
            errors:props.errors
        })
    },[props.errors])

    return (
        <div className="register">
            <div className="container box">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your foodShala account</p>

                        <InputTextField
                            type = "text"
                            name = 'name'
                            onChange = {(event)=>handleOnChange(event)}
                            value = {state.name}
                            placeholder = "Name"
                            error = {errors.name}
                        />
                        <InputTextField
                            type = "text"
                            name = 'email'
                            onChange = {(event)=>handleOnChange(event)}
                            value = {state.email}
                            placeholder = "Email"
                            error = {errors.email}
                        />
                        <InputTextField
                            type = "text"
                            name = 'password'
                            onChange = {(event)=>handleOnChange(event)}
                            value = {state.password}
                            placeholder = "Password"
                            error = {errors.password}
                        />
                        <div className="form-group">
                            <select className = "form-control form-control-lg"
                                    name = "role"
                                    value = {state.role}
                                    onChange={(event)=>handleOnChange(event)}
                            >
                                <option value = "customer" >Customer</option>
                                <option value = "admin" >Admin</option>
                                <option value = "owner" >Restaurant Owner</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className = "form-control form-control-lg"
                                    name = "preferredMeal"
                                    value = {state.preferredMeal}
                                    onChange={(event)=>handleOnChange(event)}
                            >
                                <option value = "veg" >Vegetarian</option>
                                <option value = "non-veg" >Non-vegetarian</option>
                                <option value = "both" >Both</option>
                            </select>
                        </div>
                        <input type="button" value="Submit" onClick={()=>createUserAction(state)} className="btn btn-info btn-block mt-4"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({
    errors : state.errors
})

export default connect(mapStateToProps , {
    createUserAction,
    clearErrorAction
})(RegisterUser)