var User = require("../models/user.model");

module.exports.auth = async (req, res, next)=>{


	if(!req.signedCookies.userId){
		res.redirect("/login")
		return;
	}
	let user = await User.findOne({ _id : req.signedCookies.userId});
	if(!user){
			res.redirect("/login");
	}else{

		res.locals.user = user;
		next();
	}

	
}