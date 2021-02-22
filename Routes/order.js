const express = require("express");

const router = express.Router();

const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");
const {getUserById,pushOrderPurchaseList ,getUser,allUsers,updateUser,userPurchaseList} = require("../Controllers/user");
const {updateStock, createOrder, getAllOrders,updateSatus,getOrderStatus} = require("../Controllers/order");

const {getOrderById} = require("../Controllers/order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderPurchaseList, updateStock, createOrder)
router.get("/order/all/:userId", isSignedIn, isAuthenticated,isAdmin,getAllOrders)
router.get("/order/status/:userId", isSignedIn, isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn, isAuthenticated,isAdmin,updateSatus )
module.exports = router;