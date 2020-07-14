var mongoose = require("mongoose");
var User = require("../models/user.model");


module.exports.getSignUp = (req, res)=>{
	res.render("users/signUp")
}

module.exports.postSignUp = (req, res)=>{
	bcrypt.hash(req.body.userPassword, saltRounds, function(err, hash) {
		var user = new User({
			userName: req.body.userName,
			userEmail: req.body.userEmail,
			userPassword: hash,
			userPhone: req.body.userPhone,
			userAddress: req.body.userAddress

			});
		user.save().then((err, result)=>{
			if(err){
				console.log(err);
			} 
		})
	    
	});
	res.redirect("/users/login")
	return;
}