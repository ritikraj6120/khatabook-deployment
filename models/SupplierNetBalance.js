const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierNetBalanceSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	supplier: {
		type: Schema.Types.ObjectId,
		ref: 'suppliers'
	},
	payment:{
		type:Number,
		default:0
	},
	purchase:{
		type:Number,
		default:0
	}
});

module.exports = mongoose.model('supplierNetBalance', supplierNetBalanceSchema);