

const User = require("../Models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Not Found"
            });
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.allUsers = (req, res) => {
    User.find().exec((err, user) => {
        if (!user) {
            return res.status(400).send("Users Not Found")
        }
        res.status(200).json(user);
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Your are not authorized to update the user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            return res.json(user);
        })
}


