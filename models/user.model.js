var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	userName: String,
	userEmail: String,
	userPassword: String,
	userPhone: String,
	userAddress: String

})

var User = mongoose.model("User", userSchema,"users");

module.exports = User;