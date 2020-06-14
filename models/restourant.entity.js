const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : true
    },
    contactNumber : {
        type : Number,
    },
    status : {
        type : String,
        enum : ["not-accepting-order","closed","open"],
        default : 'open'
    },
    imageUrl : String,
    menu : [{
      type : mongoose.Types.ObjectId,
      ref : 'recipe'
    }],
    createdAt: {
        type : Date
    },
    updatedAt: {
        type : Date
    },
})


restaurantSchema.pre('save', function(next){
    const now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
});


module.exports = Restaurant = mongoose.model('restaurant',restaurantSchema);