import React from "react";
import Rating from "../utils/ratingComponent";
const RestaurantView = () => {
    return (
        <div className="col-md-3 m-auto mt-2">
            <div className="card">
                <img className="card-img-top" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Apni Saroi</h5>
                    <Rating/>
                    <p className="card-text">Chinese, Japanise , Indian food master.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default RestaurantView