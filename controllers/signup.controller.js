var mongoose = require("mongoose");
var User = require("../models/user.model");


module.exports.getSignUp = (req, res)=>{
	res.render("auth/signUp")
}

module.exports.postSignUp = async (req, res)=>{

	var user = res.locals.user;
	
	await user.save().then(result=>{
			if(result){
				
				res.redirect("/login")
			} 
				
		}).catch(err=>{
			console.log(err);
			res.redirect("/signup")
		})
	
	
}