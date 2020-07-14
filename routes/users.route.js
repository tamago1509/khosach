var express = require("express");
var controller = require("../controllers/users.controller");

var router = express.Router();





router.get("/cart", controller.getCart);
router.get("/payment", controller.getPayment);

// router.post("/userSetting", controller.postUserSetting);
// router.post("/userPage", controller.postCart);
// router.post("/payment", controller.postPayment);


module.exports = router;

