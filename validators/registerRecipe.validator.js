const validator = require('validator');
const isEmpty = require('./isEmpty');
module.exports = validateRegisterRecipeInput=(data)=>{
    const errors = {};
    const name = isEmpty(data.name) ? "" : data.name;
    const description = isEmpty(data.description) ? "" : data.description;
    const price = isEmpty(data.price) ? "" : data.price;
    const mealType = isEmpty(data.mealType) ? ""  :data.mealType;

    if(validator.isEmpty(name)){
        errors.name = "Name is required field";
    }
    if(validator.isEmpty(description)){
        errors.description = "Description is required field";
    }
    if(validator.isEmpty(price)){
        errors.price = "Price is required field";
    }else if(!validator.isInt(price)){
        errors.price = "Price should be number";
    }

    if(validator.isEmpty(mealType)){
        errors.mealType = "Meal type is required field";
    }else if(!validator.isIn(mealType , ["veg",'non-veg',"both"])){
        errors.mealType = "Please choose meal type among veg,non-veg and both";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}