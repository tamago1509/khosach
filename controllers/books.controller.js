
var mongoose = require("mongoose");
var Book = require("../models/book.model");
var User = require("../models/user.model");
var Shop = require("../models/shop.model");
var books = [];


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



module.exports.getIndex = (req, res)=>{
	res.render("home/index")
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

module.exports.postBookSetting = async (req, res) =>{
	var user = await User.findOne({ _id : req.signedCookies.userId });
	var shop = await Shop.findOne({ shopOwner : user._id})


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
				price: req.body.price,
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
		
	}


}

 