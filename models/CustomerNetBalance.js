const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerNetBalanceSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'customers'
	},
	amounttoget: {
		type: Number,
		default: 0
	},
	amounttogive: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('customerNetBalance', customerNetBalanceSchema);