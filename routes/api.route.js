var express = require("express");
var controller = require("../controllers/api.controller");

var router = express.Router();

router.get("/review/:id", controller.getReview)

router.post("/buy", controller.postAddToCart)

router.get("/search", controller.search);





module.exports = router;
