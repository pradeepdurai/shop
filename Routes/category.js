const express = require("express");

const router = express.Router();


const {getCategoryById, createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require("../Controllers/category");
const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");
const {getUserById ,getUser,allUsers,updateUser,userPurchaseList} = require("../Controllers/user");
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:userId",isSignedIn, isAuthenticated,isAdmin, createCategory)
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated,isAdmin,updateCategory)
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated,isAdmin,removeCategory)


module.exports = router;