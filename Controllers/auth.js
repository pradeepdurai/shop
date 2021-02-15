
const User = require("../Models/user");
const { check, validationResult } = require('express-validator');
const user = require("../Models/user");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signUp = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    var user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.json(err.message);
        }
        else {
            return res.json({
                fullName: user.first_name + " - " + user.last_name,
                email: user.email,
                id: user._id
            });
        }
    })
}

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email does not exist"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email And Password Does not Match"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 });

        // response to FED
        const { _id, email, first_name, role } = user;
        return res.json({
            token, user: { _id, first_name, email, role }
        })
    })
}

exports.signOut = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message: "Sign Out Success"
    });
}

// Protected Route

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// Custom Middleware

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role===0){
        return res.status(403).json({
            error : "Access Denied"
        })
    }
    next();
}