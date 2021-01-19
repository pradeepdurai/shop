const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true,
        maxlength : 25,
        trim : true
    },
    description :{
        type : String,
        required : true,
        maxlength : 25,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    category : {
        type : ObjectId,
        ref : "Category",
        required : true
    },
    stock :{
        type : Number,  
    },
    sold : {
        type : Number,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    }
}, {timestamps : true});

module.exports = mongoose.model("Product", productSchema);