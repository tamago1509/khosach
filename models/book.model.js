var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new mongoose.Schema({
	title: String,
	desc: String,
	author:String,
	price: Number,
	amount: Number,
	category: String,
	bReview: String,
	cover: String,
	shopId: {type: mongoose.Types.ObjectId}

})

var Book = mongoose.model("Book", bookSchema,"books");

module.exports = Book;