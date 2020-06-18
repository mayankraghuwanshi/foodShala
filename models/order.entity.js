const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    customer : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    cart : [],

    totalPrice : {
        type : Number
    },
    isDelivered : {
      type : Boolean,
      default: false
    },
    createdAt : Date,
    updatedAt : Date
})



orderSchema.pre('save', function(next){
    const now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
});

module.exports = Order = mongoose.model('order',orderSchema);