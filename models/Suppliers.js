const mongoose = require('mongoose');
const { Schema } = mongoose;

const SupplierSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	name: {
		type: String,
		required: true
	},
	phone:{
		type:String,
		required:true,
		unique:true,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('suppliers', SupplierSchema);