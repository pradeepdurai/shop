const Product = require("../Models/product");

const formidable = require("formidable");

const _ = require("lodash");
const fs = require("fs");
const product = require("../Models/product");

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
    req.product.photo = undefined;
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
        const { productName, description, price, category, stock } = fields;
        if (!productName || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: " Please Include all fields"
            })
        }
        // Restrict on fields
        let product = new Product(fields)

        // Handlw Files Here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // Save to DB
        //const product = new Product(req.body)
        //console.log(product.productName)
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: " Not able to save product"
                });
            }
            return res.json(product)
        });
    });

}

exports.photo = (req, res) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo);
    }
    next();
}

// delete product

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to Delete the product"
            })
        }
        res.json({
            message: "Deletion was a success",
            deletedProduct
        })
    })

}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with images "
            })
        }
        // Updation Code
        let product = req.product;
        product = _.extend(product, fields)

        // Handlw Files Here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // Save to DB
        //const product = new Product(req.body)
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation is Failed"
                });
            }
            return res.json(product)
        });
    });
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(eq.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Found"
                })
            }
            return res.json(products)
        })
}



exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category", {}, (err, category) =>{
        if(err){
            return res.status(400).json({
                error : "No Category found"
            })
        }
        res.json(category)
    })
}

