
var mongoose = require("mongoose");
var Book = require("../models/book.model");
var books = [];


module.exports.getHome = function(req, res){
	res.render("books/home",{
		books: books
	})
}
module.exports.getBookManagement = (req, res)=>{
	res.render("books/bookManagement")
}

module.exports.getBookSetting = (req, res)=>{
	res.render("books/bookSetting")
}

module.exports.getBookUpdate = (req, res)=>{
	res.render("books/bookUpdate")
}

module.exports.getBookDetail = (req, res)=>{
	res.render("books/bookDetail")
} 