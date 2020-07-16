var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var shopSchema = new mongoose.Schema({
	shopName: String,
	shopDesc: String,
	shopOwner:{type: mongoose.Types.ObjectId},
	category: String
})

var Shop = mongoose.model("shop", shopSchema, "shops");

module.exports = Shop;