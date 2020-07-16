var express = require("express");
var controller = require("../controllers/books.controller");

var router = express.Router();

const multer = require('multer') // v1.0.5
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })




router.get("/index", controller.getIndex);
router.get("/bookManagement", controller.getBookManagement);
router.get("/bookSetting", controller.getBookSetting);
router.get("/bookUpdate", controller.getBookUpdate);
router.get("/bookDetail", controller.getBookDetail);


// router.post("/home", controller.postHome);
// router.post("/bookManagement", controller.postBookManagement);
router.post("/bookSetting",upload.single('cover'), controller.postBookSetting);
// router.post("/bookUpdate", controller.postBookUpdate);
// router.post("/bookDetail", controller.postBookDetail);


module.exports = router;

