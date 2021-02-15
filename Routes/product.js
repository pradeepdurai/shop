const express = require("express");

const router = express.Router();
const {getProduct,createProduct,getProductById} = require("../Controllers/product");
const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");
const {getUserById ,getUser,allUsers,updateUser,userPurchaseList} = require("../Controllers/user");
router.param("userId", getUserById);
router.param("productId", getProductById);

router.get("/product/:productId/:userId",isSignedIn, isAuthenticated,isAdmin, getProduct)
router.post("/product/:userId", isSignedIn, isAuthenticated,isAdmin, createProduct);


module.exports = router;