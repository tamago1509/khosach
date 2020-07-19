
var mongoose = require("mongoose");
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



const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.getCart = async (req, res)=>{

	function change(price){
		let changePrice = price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
		return changePrice
	}
	var user = await User.findOne({ _id : req.signedCookies.userId})
	var trans = await Transaction.find({ userId : req.signedCookies.userId})
	var sum = 0;
	for(let i= 0; i < trans.length; i++){
		sum += (trans[i].price*trans[i].cart)
	}
	
		res.render("users/cart",{
			user: user,
			trans: trans,
			sum: sum,
			func: change

	

	})
	
}

module.exports.getSetting = async (req, res)=>{
	var user = await User.findOne({ _id : req.signedCookies.userId})
		res.render("users/setting",{
			user: user
	})
}



module.exports.getPayment = async (req, res)=>{
	function change(price){
		let changePrice = price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
		return changePrice
	}
	var user = await User.findOne({ _id : req.signedCookies.userId})
	var trans = await Transaction.find({ userId : req.signedCookies.userId})
	var sum = 0;
	for(let i= 0; i < trans.length; i++){
		sum += (trans[i].price*trans[i].cart)
	}
		res.render("users/payment",{
			user: user,
			sum : sum,
			func: change
	})
}


module.exports.postSetting = async (req, res)=>{


	var oldPass = req.body.oldPassword;
	var newPass = req.body.newPassword;
	var user = await User.findOne({ _id : req.signedCookies.userId})
	console.log(oldPass);
	var updateId = { _id :user._id };
	
	

	let errors = []

	if(req.file) {
		console.log("check file")
		const base64 = changeToBase64(req).content;
		 
		cloudinary.uploader
		.upload(base64)
		.then((result) => {

			var filter ={_id: user._id}
			var updateContent = { avatar: result.url }
			User.findOneAndUpdate( filter, updateContent)
			.then(result => {
				console.log("Update 1 successfully!")
				res.redirect("/users/setting")
			})
			.catch(err =>  res.render("users/setting", {
				errors : ["update failed"]
			}))

		})
		.catch(err => res.render("users/setting", {
			errors : ["upload failed"]
		}))
		
	}

	if(oldPass && newPass){

		console.log("before")
		bcrypt.compare(oldPass, user.userPassword, function(errors, result){
			console.log("checking")
			if(result){
				let updateContent = { userPassword: req.body.newPassword }
				
				User.findOneAndUpdate(updateId , updateContent,{
					returnOriginal: false
				},function(err){
					if(err)
						console.log(err);
						return;
				}).then(result => {
					console.log("Update 2 successfully!")
					res.redirect("/users/setting")
					
				})
			} else{
				errors = ["Wrong password!!"]
				res.render("users/setting", {
					errors
				})
			}
		})
		console.log("after")
	}

		
	let updateContent = {userName: req.body.userName||user.userName, 
		userEmail: req.body.userEmail||user.userEmail,
		userAddress: req.body.userAddress|| user.userAddress}
	console.log(req.body)

	User.findOneAndUpdate({_id: user._id} , updateContent,{ new: true })
	.then(function(err, result){
		if(err){
			console.log(err);
			return;
		}else {
			//console.log(result)
			console.log("Update 3 successfully!")
			res.redirect("/users/setting")
		}
	})


}

module.exports.postShop = async function(req, res){

	var user = await User.findOne({_id : req.signedCookies.userId});

	var shopName = req.body.shopName;
	var shopDesc =req.body.shopDesc;
	var category = req.body.category;
	var shopOwner = user._id;


	let shopInfo = {shopName: shopName, shopDesc: shopDesc, category: category, shopOwner:shopOwner}
	console.log(user)

	if(shopName && shopDesc && category){
		Shop.insertMany([shopInfo]).then(result=>{
			console.log("Shop has been created!!!")
			res.redirect("/users/setting")
		}).catch(errors=>{
			res.render("users/setting",{
			
				errors

			})
		})
	}				
}

module.exports.delete = (req, res)=>{
	var bookId = req.params.id;
	console.log(bookId);
	Transaction.deleteOne({ bookId: req.params.id}).then(result=>{
		console.log("Đã xóa yêu cầu");
		res.redirect("/users/cart")

	}).catch(e=>{
		console.log(e)
		res.redirect("/users/cart")
	})
}
