const validator = require('validator');
const isEmpty = require('./isEmpty');
module.exports = validateUpdateRestaurantInput = (data)=>{
    const errors = {};
    const name = isEmpty(data.name) ? "" : data.name;
    const description = isEmpty(data.description) ? "" : data.description;
    const address = isEmpty(data.address) ? "" : data.address;
    const contactNumber = isEmpty(data.contactNumber) ? "" : data.contactNumber;
    const status = isEmpty(data.status) ? "" : data.status;



    if(validator.isEmpty(name)){
        errors.name = "Name field is required";
    }
    if(validator.isEmpty(description)){
        errors.description = "Description field is required";
    }
    if(validator.isEmpty(address)){
        errors.address = "Address field is required";
    }
    if(!validator.isEmpty(contactNumber) && !validator.isLength(contactNumber,10)){
        errors.contactNumber = "Please provide valid contact number"
    }
    if(validator.isEmpty(status)){
        errors.status = "Status field is required";
    }
    if(!validator.isEmpty(status) && !validator.isIn(status,["not-accepting-orders" , "open" , "closed"])){
        errors.status = "Please provide valid status";
    }


    return {
        errors,
        isValid : isEmpty(errors)
    }
}