var express = require("express");
var controller = require("../controllers/signup.controller");
var validate =require("../middleware/signup.validator");

var router = express.Router();


router.get("/", controller.getSignUp)
router.post("/", validate.validator, controller.postSignUp )




module.exports = router