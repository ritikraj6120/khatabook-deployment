const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerTransactionsSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'customers'
	},
	lendamount_singleCustomer: {
		type: Number,
		default: 0,
	},
	takeamount_singleCustomer:{
		type: Number,
		default: 0,
	},
	billDetails:{
		type:String
	},
	billNo:{
		type:String
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('CustomerTransactions',CustomerTransactionsSchema);