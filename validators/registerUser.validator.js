const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateUserRegisterInput (data) {
    const errors = {};
    const name = isEmpty(data.name) ? "" : data.name;
    const password = isEmpty((data.password)) ? "" : data.password;
    const email = isEmpty(data.email) ? "" : data.email;
    const role = isEmpty(data.role) ? "" : data.role;
    const preferredMeal = isEmpty(data.preferredMeal) ? "" : data.preferredMeal;

    if(validator.isEmpty(name)){
        errors.name = "Name field is required"
    }
    if(validator.isEmpty(password)){
        errors.password = "Password field is required"
    }
    if(!validator.isEmpty(password) && !validator.isLength(password , {min : 2 ,  max : 8})){
        errors.password = "Password must be at least 2 and at max 8 word long.";
    }

    if(validator.isEmpty(email)){
        errors.email = "Email field is required";
    }
    if(!validator.isEmpty(email) &&!validator.isEmail(email)){
        errors.email = "Email is invalid!";
    }
    if(validator.isEmpty(role)){
        errors.role = "Role is required"
    }
    if(!validator.isEmpty(role) && !validator.isIn(role , ["admin" , "owner" , "customer"])){
        errors.role = "Choose among admin, owner or customer";
    }
    if(!validator.isEmpty(preferredMeal) && !validator.isIn(preferredMeal , ['veg','nonveg','both'])){
        errors.preferredMeal = "Please choose a valid preferred meal";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}