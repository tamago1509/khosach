var express = require("express");
var controller = require("../controllers/users.controller");

const multer = require('multer') // v1.0.5
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


var router = express.Router();


router.get("/cart", controller.getCart);
router.get("/setting", controller.getSetting)
router.get("/payment", controller.getPayment);

router.post("/setting", upload.single('avatar'), controller.postSetting);
router.post("/postShop", controller.postShop);
// router.post("/userPage", controller.postCart);
// router.post("/payment", controller.postPayment);


module.exports = router;

