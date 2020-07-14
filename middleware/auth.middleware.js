var User = require("../models/user.model");

module.exports.auth = async (req, res, next)=>{


	if(!req.signedCookies){
		res.redirect("/auth/login")
		return;
	} else{
			let user = await User.findOne({ _id : req.signedCookies});
			if(!user){
				res.redirect("/auth/login");
			}

	}
	next();
}