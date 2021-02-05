const express = require("express");

const router = express.Router();

const {getUserById} = require("../Controllers/user");

const {isSignedIn, isAuthenticated,isAdmin} = require("../Controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated,isAdmin)


module.exports = router;