import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import InputTextField from "../utils/inputTextField";
import {registerRecipeAction} from "../../actions/recipeAction";

const RegisterRecipe = (props)=>{
    const [state , setState] = useState({
        name : "",
        description : "",
        price : "",
        mealType : "veg",
        errors : props.errors
    })
    const {errors} = state;
    const {registerRecipeAction} = props;
    const {restaurantId} = props.match.params;

    useEffect(()=>{
        setState({
            ...state,
            errors : props.errors
        })
    },[props.errors]);

    const handleOnChange=(e)=>{
        const {name , value} = e.target;
        setState({
            ...state,
            errors : {},
            [name]:value
        })
    }


    return (
        <div className="register-recipe">
            <div className="container">
                <div className='col-md-8 m-auto'>
                    <h1 className="display-4 text-center">Register Recipe</h1>
                    <p className="lead text-center"></p>
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
                        name = "price"
                        placeholder="price"
                        value = {state.price}
                        error = {errors.price}
                        onChange={(e)=>handleOnChange(e)}
                    />
                    <div className="form-group">
                        <select className = "form-control form-control-lg"
                                name = "mealType"
                                value = {state.mealType}
                                onChange={(event)=>handleOnChange(event)}>
                            <option value = "veg" >Vegetarian</option>
                            <option value = "non-veg" >Non Vegetarian</option>
                            <option value = "both" >Both</option>
                        </select>
                    </div>
                    <input type="button" value="Submit" onClick={()=>registerRecipeAction(state , restaurantId)} className="btn btn-info btn-block mt-4"/>
                </div>
            </div>
        </div>
    )





}

const mapStateToProps = (state)=>({
    errors : state.errors
})

export default connect(mapStateToProps , {
    registerRecipeAction
})(RegisterRecipe)
