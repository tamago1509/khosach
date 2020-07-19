var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var transactionSchema = new mongoose.Schema({
	userId: Schema.Types.ObjectId,
	bookTitle: String,
	bookId: Schema.Types.ObjectId,
	cart: Number,
	price: Number
})

var Transaction =  mongoose.model('Transaction', transactionSchema,'transactions');

module.exports = Transaction;