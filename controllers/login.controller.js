

module.exports.getLogin= (req, res)=>{
	res.render("auth/login")

}

module.exports.postLogin = (req, res) => {

	let userId = res.locals.userId
	res.cookie("userId", userId,{ signed: true })
	res.redirect("/books/index")

}