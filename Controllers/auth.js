
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