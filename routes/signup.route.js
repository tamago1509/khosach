var express = require("express");
var controller = require("../controllers/signup.controller");

var router = express.Router();


router.get("/", controller.getSignUp)




module.exports = router