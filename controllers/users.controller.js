
var mongoose = require("mongoose");
var User = require("../models/user.model");


const bcrypt = require('bcrypt');
const saltRounds = 10;








module.exports.getCart = (req, res)=>{
	res.render("users/cart")
}

module.exports.getUserSetting = (req, res)=>{
	res.render("users/setting")
}
module.exports.getPayment = (req, res)=>{
	res.render("users/payment")
}



