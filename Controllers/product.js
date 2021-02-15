const Product = require("../Models/product");

const formidable = require("formidable");

const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById({ _id: id }).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product not appear in db"
            })
        }
        req.product = product;
        next();
    });

}

exports.getProduct = (req, res) => {
    return res.json(req.product)
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with images "
            })
        }
        //destructure the fields
        const {name,description, price,category,stock} = fields;
        if(!name || !description || !price || !category || !stock)
        {
            return res.status(400).json({
                error : " Please Include all fields"
            })
        }
        // Restrict on fields
        let product = new Product(fields)

        // Handlw Files Here
        if (file.photo) {
            if (file.photo.size > 30000) {
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.size.path)
            product.photo.contentType = file.photo.type
        }
        // Save to DB
        //const product = new Product(req.body)
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: " Not able to save product"
                })
            }
            return res.json(product)
        })
    })

}

