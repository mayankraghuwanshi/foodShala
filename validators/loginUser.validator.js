const validator = require('validator');
const isEmpty = require('./isEmpty');
module.exports = validateLoginUserInput=(data)=>{
    const email = isEmpty(data.email) ? "" : data.email;
    const password = isEmpty(data.password) ? "" : data.password;
    const errors = {};
    
    if(validator.isEmpty(email)){
        errors.email = "Email field is required.";
    }else if(!validator.isEmail(email)){
        errors.email = "Please provide a valid email.";
    }

    if(validator.isEmpty(password)){
        errors.password = "Password field is required.";
    }else if(!validator.isLength(password , {min : 2 , max: 8})){
        errors.password = "Password must be al least 2 digit and at most 8 digit long."
    }



    return {
        errors,
        isValid : isEmpty(errors)
    }

}