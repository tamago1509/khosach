var mongoose = require("mongoose");
var User = require("../models/user.model");

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.validator = async (req, res, next) => {
	var email = req.body.userEmail;
	var password = req.body.userPassword;
	var user = await User.findOne({userEmail: email})
	
	var errors = [];
	if(!user){
		errors.push("Email doesn't exit!")
		res.render("auth/login",{
			errors: errors
		})
		return;
	} else{
		bcrypt.compare(password, user.userPassword, function(err, result) {
	    	if(result){
	    		console.log("Login successful!")
	    		res.locals.userId = user._id
	    		next()
	    	} else{
	    		errors.push("Wrong password!")
	    		res.render("auth/login",{
	    			errors: errors
	    		})
	    		console.log(err)
	    		return;
	    	}
		});
	}

}