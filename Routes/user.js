const express = require("express");

const router = express.Router();

const {getUserById ,getUser,allUsers,updateUser} = require("../Controllers/user");

const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");
router.get("/user/get-all",allUsers);
router.param("userId", getUserById);
router.get("/user/:userId",isSignedIn, isAuthenticated ,getUser);
router.put("/user/:userId",isSignedIn, isAuthenticated ,updateUser);






module.exports = router;