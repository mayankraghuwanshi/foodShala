import React, {useEffect, useState} from 'react';
import InputTextField from "../utils/inputTextField";
import {connect} from "react-redux";
import {clearErrorAction, loginUserAction} from "../../actions/authActions"

const Login = (props)=>{
    const {loginUserAction,clearErrorAction} = props;
    const [state , setState] = useState({
        email : "",
        password : "",
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
        clearErrorAction();
    },[]);

    useEffect(()=>{
        setState({
            ...state,
            errors : props.errors,
        })
    } ,[props.errors])



    return (
        <div className="login">
            <div className="box container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="display-4 text-center">Sign In</h1>
                        <p className="lead text-center">Sign in to your foodShala account</p>
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
                        <input type="button" value="Sign In" onClick={()=>loginUserAction(state)} className="btn btn-info btn-block mt-4"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state=>({
    errors : state.errors
})

export default connect(mapStateToProps , {
    loginUserAction,
    clearErrorAction
})(Login)