const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    cat_name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        maxlength : 25,

    }
}, {timestamps : true})

module.exports = mongoose.model('Category',categorySchema)