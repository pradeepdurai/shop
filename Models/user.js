import { v4 as uuidv4 } from 'uuid';
uuidv4();
const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = new mongoose.schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userInfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        trim: true

    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
});

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password)
})
.get()
userSchema.methods = {

    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return "";
        }
    }
}
module.exports = mongoose.model("user", userSchema);