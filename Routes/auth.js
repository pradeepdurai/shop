

const express = require("express");
const { check, validationResult } = require('express-validator');

var router = express.Router();

const {signUp,signIn,signOut,isSignedIn} = require("../Controllers/auth");

router.post("/signup",[
    check("first_name","First Name should be at least 3 letters").isLength({min : 3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 letters").isLength({min : 3})
],signUp);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 letters").isLength({min : 3})
],signIn);


router.get("/signout",signOut);

router.get('/testroute',isSignedIn,(req,res) => {
   return res.send("Protected Route");
})

module.exports = router;