var mongoose = require("mongoose");
var User = require("../models/user.model");

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.validator = async (req, res, next) => {
	var email = req.body.userEmail;

	
	var user = await User.findOne({userEmail: email})
	
	var errors = [];

	if(!user){

		bcrypt.hash(req.body.userPassword, saltRounds, function(err, hash) {
			var user = new User({
				userName: req.body.userName,
				userEmail: req.body.userEmail,
				userPassword: hash,
				userPhone: req.body.userPhone,
				userAddress: req.body.userAddress

				})
			res.locals.user = user;
			next();
	});
	} else {
		errors.push("Email has exited,please try other!")
		res.render("auth/signUp",{
			errors: errors
		})
		return;
	}
}