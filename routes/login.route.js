var express = require("express");
var controller = require("../controllers/login.controller");
var middleware = require("../middleware/login.validator")
var router = express.Router();


router.get("/", controller.getLogin)

router.post("/", middleware.validator , controller.postLogin)


module.exports = router