var express = require("express");
var controller = require("./controllers/users.controller");

var router = express.Router();




router.get("/signUp", controller.getSignUp);
router.get("/login", controller.getLogin);
router.get("/userSetting", controller.getUserSetting);
router.get("/userPage", controller.getCart);
router.get("/payment", controller.getPayment);

router.post("/signUp", controller.postSignUp);
router.post("/login", controller.postLogin);
router.post("/userSetting", controller.postUserSetting);
router.post("/userPage", controller.postCart);
router.post("/payment", controller.postPayment);


module.exports = router;

