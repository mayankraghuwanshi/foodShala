const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required: true
    },

    imageUrl : String,

    price : {
        type : Number,
        required : true
    },
    restaurant : {
        type  : mongoose.Types.ObjectId,
        ref : "restaurant"
    },
    mealType : {
        type : String,
        enum : ['veg','non-veg','both'],
        required : true
    },
    category : String,
    createdAt : Date,
    updatedAt : Date

})



recipeSchema.pre('save', function(next){
    const now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
});


module.exports = Recipes = mongoose.model('recipe' , recipeSchema);