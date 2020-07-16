var mongoose = require("mongoose");
var User = require("../models/user.model");


module.exports.getSignUp = (req, res)=>{
	res.render("auth/signUp")
}

module.exports.postSignUp = (req, res)=>{
	var user = res.locals.user;
	user.save().then((err, result)=>{
			if(err){
				console.log(err);
				res.sendStatus(500)
			} 
			res.redirect("/login")
		})
	
	
}