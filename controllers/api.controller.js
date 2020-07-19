var Book = require("../models/book.model");
var User = require("../models/user.model");
var Transaction = require("../models/transaction.model");

module.exports.getReview = function(req, res){
	let id = req.params.id
	Book.findOne( {_id : id} )
	.then(book => {
		res.json(book)
	})
	.catch(err => res.json({err : 1}))
}



module.exports.postAddToCart = async function(req, res){

	var book = await Book.findOne({ _id : req.body.id});
	var title = book.title;



	let filter = {
		bookId : req.body.id, 
		userId : req.signedCookies.userId
		
	};
	let updateContent = {

		bookId: req.body.id,
		bookTitle: title,
		userId: req.signedCookies.userId,
		$inc: {cart: 1},
		price : book.price
	}
	let transaction = await Transaction.findOneAndUpdate(filter, updateContent,{
		new : true,
		upsert: true
	})
	.then (async result=>{
		let trans = await Transaction.find({ userId: req.signedCookies.userId});
		let totalItems = 0;
		for(var i = 0 ; i< trans.length; i++){
			totalItems+=trans[i].cart;
		}
		
		res.json({
			result, totalItems
		})
	})
	.catch(e=>{
		console.log(e);
	})

}

module.exports.search = async (req, res)=>{
 
 let books = await Book.find();
 res.json(books);
}