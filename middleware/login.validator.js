var mongoose = require("mongoose");
var User = require("../models/user.model");

module.exports.validator = async (req, res, next) => {
	var email = req.body.userEmail;
	var password = req.body.userPassword;
	var user = await User.findOne({userEmail: email})
	console.log(password);
	var errors = [];
	if(!user){
		errors.push("Email doesn't exit!")
		res.render("users/login",{
			errors: errors
		})
		return;
	} else{
		bcrypt.compare(password, user.userPassword, function(err, result) {
	    	if(result){
	    		console.log("Login successful!")
	    		res.local.userId = user._id
	    		next()
	    	} else{
	    		errors.push("Wrong password!")
	    		res.render("users/login",{
	    			errors: errors
	    		})
	    		console.log(err)
	    		return;
	    	}
		});
	}
}