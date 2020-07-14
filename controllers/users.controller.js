



module.exports.getSetting = (req, res)=>{
	res.render("users/signUp")
}

module.exports.getLogin = (req, res)=>{
	res.render("users/login")
}

module.exports.getUserSetting = (req, res)=>{
	res.render("users/setting")
}

module.exports.getCart = (req, res)=>{
	res.render("users/cart")
}

module.exports.getPayment = (req, res)=>{
	res.render("users/payment")
}

module.exports.postSetting = (req, res)=>{
	var user = req.body;
	User.insert(user).then((err, result)=>{
		if(err){
			console.log(err);
		} else {
			console.log(result);
		}
	})
	res.redirect("/")
}