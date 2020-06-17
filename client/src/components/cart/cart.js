import React from "react";
import {connect} from "react-redux";

const Cart = (props) => {
    const {cart} = props;
    return (
        <div>
            <Recipes
                recipes = {cart.items}
            />
            <h2 className="mt-5" align="center">Total Price: {cart.totalPrice}</h2>
            <div style={{width : "100px" , margin : "auto" , display : "block"}}>
                <button  className="btn btn-primary center" disabled>Order</button>
            </div>

        </div>
    )
}

const Recipe =(props)=>{
    const {recipe} = props;
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
                    <p>item : {recipe.count}</p>
                </div>
            </div>
        </div>
    )
}


const Recipes =(props)=>{
    const {recipes} = props;
    return (
        <div className="container">
            <div className="row center">
                <div  className="col-md-8">
                    {
                        recipes.map((recipe , key)=>(
                            <Recipe
                                recipe = {recipe}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}









const mapStateToProps = (state)=>({
    cart : state.cart
})

export default connect(mapStateToProps , {})(Cart)