const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema =  new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin" , "owner" , "customer"],
        default : "customer"
    },

    address : {
        type: String,
        required : false
    },

    preferredMeal : {
        type : String,
        enum : ['veg',"nonveg","both"],
        default: 'both',
    },
    createdAt: {
        type : Date,
    },
    updatedAt : {
        type : Date
    }


})

userSchema.pre('save', function(next){
    now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
});


module.exports = User =  mongoose.model('user' , userSchema);