

module.exports.getLogin= (req, res)=>{
	res.render("users/login")

}

module.exports.postLogin = (req, res) => {

	let userId = req.local.userId
	res.cookie("userId", userId,{ signed: true })
	res.redirect("/books/home")

}