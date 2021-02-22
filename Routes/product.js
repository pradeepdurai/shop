const express = require("express");

const router = express.Router();
const {getProduct,createProduct,getProductById,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../Controllers/product");
const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");
const {getUserById ,getUser,allUsers,updateUser,userPurchaseList} = require("../Controllers/user");
router.param("userId", getUserById);
router.param("productId", getProductById);

router.get("/product/:productId/", getProduct);
router.post("/product/create/:userId", isSignedIn, isAuthenticated,isAdmin, createProduct);
router.get("/product/photo/:productId", photo);

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated,isAdmin, deleteProduct);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated,isAdmin, updateProduct);
router.get("/products", getAllProducts)

router.get("/products/categories", getAllUniqueCategories)


module.exports = router;