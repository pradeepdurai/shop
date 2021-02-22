const { Order, productCart } = require("../Models/order")

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No Order Found"
                })
            }
            res.order = order;
            next();
        })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save order in DB"
            })
        }
        res.json(order);
    })
}
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: prod.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk Operation field"
            })
        }
        next();
    })
}

exports.getAllOrders = (req, res) =>{
    Order.find()
    .populate("user","_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error : "No Order Found"
            }) 
        }
        res.json(order);
    })
}

exports.updateSatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.getOrderStatus = (req,res) => {
    Order.update({_id : req.body.orderId},
        {$set: {status : req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    error : "Cannot Update Order Status"
                })
            }
            res.json(order )
        })
}