const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	name: {
		type: String,
		required: true,
		unique:false
	},
	phone:{
		type:String,
		required:true,
		unique:true
	},
	date: {
		type: Date,
		default: Date.now
	},
});


module.exports = mongoose.model('customers', CustomerSchema);