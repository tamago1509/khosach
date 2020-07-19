
var mongoose = require("mongoose");
var Book = require("../models/book.model");
var User = require("../models/user.model");
var Shop = require("../models/shop.model");
var Transaction = require("../models/transaction.model");



//config cloudinary

var cloudinary = require('cloudinary').v2;
var path = require('path')
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

//
const changeToBase64 = req => {
	let ext = req.file.originalname.split(".")
	ext = `.${ext.pop()}`
	console.log(ext)
	return parser.format(ext.toString(), req.file.buffer)
}


//multer and config
const multer  = require('multer')
const storage = multer.memoryStorage();
//



cloudinary.config({ 
  cloud_name: 'ngocduongflyinthesky1509', 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const multerUploads = multer({ storage }).single('image');



module.exports.getIndex = async (req, res)=>{
	var books = await Book.find();
	var trans = await Transaction.find({ userId: req.signedCookies.userId});

	let totalItems = 0;
		for(var i = 0 ; i< trans.length; i++){
			totalItems+=trans[i].cart;
		}
		 

	function change(price){
		let changePrice = price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
		return changePrice
	}

	res.render("home/index",{

		func : change,
		books: books,
		totalItems: totalItems

	})
}
module.exports.getBookManagement = async (req, res)=>{
	var userId = req.signedCookies.userId;
	var user = await User.findOne({_id : userId});
	var shop = await Shop.findOne({ shopOwner : user._id});
	var books = await Book.find({shopId : shop._id })
	
	res.render("books/bookManagement",{
		user: user,
		books: books
	})
}
module.exports.delete = (req, res)=>{
	var bookId = req.params.id;
	
	Book.deleteOne({ _id : bookId}).then(result=>{
		console.log("Đã xóa yêu cầu");
		res.redirect("/books/bookManagement")

	}).catch(e=>{
		console.log(e)
		res.redirect("/books/bookManagement")
	})
}
module.exports.getBookSetting = async (req, res)=>{
	var user = await User.findOne({_id : req.signedCookies.userId});
	var book = await Book.findOne({_id : req.params.id});
		res.render("books/bookSetting",{

		user: user,
		book: book


	})
}

module.exports.getBookUpdate = (req, res)=>{
	res.render("books/bookUpdate")
}

module.exports.getBookDetail = async (req, res)=>{
	var bookId = req.params.id;
	var book = await Book.findOne({ _id : bookId})
	console.log(bookId)
	res.render("books/bookDetail",{

		book: book

	})
}
module.exports.postBookUpdate = async(req, res)=>{
	var user = await User.findOne({ _id : req.signedCookies.userId });
	var shop = await Shop.findOne({ shopOwner : user._id})
	var book = await Book.findOne({_id : req.params.id});
	let price = req.body.price;
	let filter ={ _id : req.params.id}

	var changePrice = price
	// .toLocaleString('vi', {style : 'currency', currency : 'VND'});

	if(req.file) {
		console.log("check file")
		const base64 = changeToBase64(req).content;
		 
		cloudinary.uploader
		.upload(base64)
		.then((result) => {

			var updateContent = { 
				title: req.body.title||book.title,
				desc: req.body.desc||book.desc,
				author:req.body.author||book.author,
				price: changePrice || book.price,
				amount: req.body.amount ||book.amount,
				category: req.body.category ||book.category,
				bReview: req.body.bReview||book.bReview,
				cover: result.url,
				shopId: shop._id
			}

			Book.findOneAndUpdate(filter, updateContent)
			.then(result => {
				console.log("Creating a new book successfully!")
				res.redirect("/books/bookSetting")
			})
			.catch(err =>  res.render("books/bookSetting", {
				errors : ["update failed"]
			}))

		})
		.catch(err => res.render("books/bookSetting", {
			errors : ["upload failed"]
		}))
		
	} else{
		res.render("books/setting",{
			errors:["Please take a cover for your book to continue !!"]
		})
	}
}
module.exports.postBookSetting = async (req, res) =>{
	var user = await User.findOne({ _id : req.signedCookies.userId });
	var shop = await Shop.findOne({ shopOwner : user._id})
	let price = req.body.price;

	var changePrice = price
	// .toLocaleString('vi', {style : 'currency', currency : 'VND'});

	if(req.file) {
		console.log("check file")
		const base64 = changeToBase64(req).content;
		 
		cloudinary.uploader
		.upload(base64)
		.then((result) => {

			var bookInfo = { 
				title: req.body.title,
				desc: req.body.desc,
				author:req.body.author,
				price: changePrice,
				amount: req.body.amount,
				category: req.body.category,
				bReview: req.body.bReview,
				cover: result.url,
				shopId: shop._id
			}

			Book.insertMany([bookInfo])
			.then(result => {
				console.log("Creating a new book successfully!")
				res.redirect("/books/bookSetting")
			})
			.catch(err =>  res.render("books/bookSetting", {
				errors : ["update failed"]
			}))

		})
		.catch(err => res.render("books/bookSetting", {
			errors : ["upload failed"]
		}))
		
	} else{
		res.render("books/setting",{
			errors:["Please take a cover for your book to continue !!"]
		})
	}


}

 