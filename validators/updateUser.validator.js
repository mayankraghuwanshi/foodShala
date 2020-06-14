const validator = require('validator');
const isEmpty = require('./isEmpty');
module.exports = function validateUserUpdateInput(data) {
    const errors = {};
    const name = isEmpty(data.name)? "" :data.name;
    const email = isEmpty(data.email)? "":data.email;
    const role = isEmpty(data.role)? "":data.role;
    const preferredMeal = isEmpty(data.preferredMeal)? "":data.preferredMeal;


    if(!validator.isEmpty(email) && !validator.isEmail(email)){
        errors.email = "please provide a valid email";
    }
    if(!validator.isEmpty(role) && !validator.isIn(role,['admin',"owner","customer"])){
        errors.role = "please choose role from admin, owner of customer";
    }
    if(!validator.isEmpty(preferredMeal) && !validator.isIn(preferredMeal , ['veg','nonveg','both'])){
        erros.preferredMeal = "please choose a valid preferred meal";
    }


    return {
        errors,
        isValid : isEmpty(errors)
    }
}