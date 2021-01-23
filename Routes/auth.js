

const express = require("express");
const { body, validationResult } = require('express-validator');

var router = express.Router();

const {signUp} = require("../Controllers/auth");

router.post("/signup",[body('email').isEmail()],signUp);


module.exports = router;