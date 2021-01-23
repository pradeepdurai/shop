const express = require("express")

const router = express.Router();

const {signIn} = require("../Controllers/auth");

router.get("/signin",signIn)

module.exports = router;