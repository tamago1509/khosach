var express = require("express");
var controller = require("./controllers/shops.controller");

var router = express.Router();




router.get("/home", controller.getHome);
router.get("/bookManagement", controller.getBookManagement);
router.get("/bookSetting", controller.getBookSetting);
router.get("/bookUpdate", controller.getBookUpdate);
router.get("/bookDetail", controller.getBookDetail);


router.post("/home", controller.postHome);
router.post("/bookManagement", controller.postBookManagement);
router.post("/bookSetting", controller.postBookSetting);
router.post("/bookUpdate", controller.postBookUpdate);
router.post("/bookDetail", controller.postBookDetail);


module.exports = router;

