

const User = require("../Models/user")
const Order = require("../Models/order");
const { orderBy } = require("lodash");

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

exports.userPurchaseList = (req, res) => {
    order.find({ user: req.profile._id })
        .populate("User", "_id name email").exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No Order Found"
                })
            }
            return res.json(order)

        })
}

exports.pushOrderPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.purchases.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
        User.findByIdAndUpdate(
            { _id: req.profile._id },
            { $push: { purchases: purchases } },
            { new: true },
            (err, purchases) => {

                if(err){
                    return res.status(400).json({
                        error : "Unable to save purchase lost"
                    })
                }
            }
        )
    })
    next()
}


