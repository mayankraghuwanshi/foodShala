import React from 'react'
import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import RegisterUser from "./components/auth/registerUser";
import LoginUser from "./components/auth/loginUser";
import setAuthHeader from "./helpers/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import jwt_decode from 'jwt-decode';
import RestaurantRegister from "./components/restaurant/registerRestaurant";
import PrivateRoute from "./components/utils/privateRoute";
import RegisterRecipe from "./components/recipe/registerRecipe";
import RestaurantView from "./components/restaurant/viewRestaurant";


if(localStorage.jwtToken){
    setAuthHeader(localStorage.jwtToken)
    const user = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(user))

}



function App() {
  return (
    <Provider store = {store}>
      <Router basename="">
          <div className="App">
              <Router exact path = "/">
                  <RestaurantView/>
              </Router>
              <Route exact path = "/users/login">
                  <LoginUser/>
              </Route>
              <Route exact path = "/users/register">
                  <RegisterUser/>
              </Route>
              <PrivateRoute excat path = "/restaurants/register" component = {RestaurantRegister}  />
              <PrivateRoute excat path = "/recipes/register/:restaurantId" component = {RegisterRecipe}  />
          </div>
      </Router>
    </Provider>
  );
}

export default App;
