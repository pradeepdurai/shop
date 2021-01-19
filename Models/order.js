const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product :{
        type : ObjectId,
        ref : "Product"
    },
    count : {
        type : String
    },
    product_name : {
        type : String
    },
    price : {
        type : String
    },
})

const productCart = mongoose.model("ProductCart",productCartSchema);

const orderSchema = new mongoose.Schema({
    products : [productCartSchema],
    transaction_id : {},
    amount : {type : Number},
    updated : Date,
    user : {
        type : ObjectId,
        ref : "User"
    }
}, {timestamps : true})

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order, productCart}