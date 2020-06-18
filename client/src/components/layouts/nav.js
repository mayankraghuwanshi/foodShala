import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logOutUserAction} from "../../actions/authActions";

const NavBar = (props) =>{
    const {auth , cart} = props;
    const {logOutUserAction} = props;

    const adminLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/restaurants/register">
                    Add restaurant
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart">
                    {cart.itemSize} Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/orders">
                    My orders
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users/login" onClick={()=>logOutUserAction()}>
                    <img className="rounded-circle" style={{width: "25px" , marginRight: "5px"}}
                         src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png  "
                         alt="" title="You must have a Gravatar connected to your email to display an image"/> Logout
                </Link>
            </li>

        </ul>
    )

    const authLink = (
        <ul className="navbar-nav ml-auto">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                        {cart.itemSize} Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                        My orders
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/users/login" onClick={()=>logOutUserAction()}>
                        <img className="rounded-circle" style={{width: "25px" , marginRight: "5px"}}
                             src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png  "
                             alt="" title="You must have a Gravatar connected to your email to display an image"/> Logout
                    </Link>
                </li>
            </ul>
        </ul>)

    const guestLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/users/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users/login">Login</Link>
            </li>
        </ul>
    )

    return (
        <div style={{
            backgroundColor : "teal"
        }}>
            <nav  className="navbar navbar-expand-sm navbar-dark bg-gradient mb-4">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                            </li>
                        </ul>
                        {auth.isAuthenticated ? auth.user.role==="customer"? authLink :adminLink : guestLink}

                    </div>
                </div>
            </nav>

        </div>
    )
}

const mapStateToProps = state=>({
    auth : state.auth,
    cart : state.cart
})
export default connect(mapStateToProps , {logOutUserAction})(NavBar);