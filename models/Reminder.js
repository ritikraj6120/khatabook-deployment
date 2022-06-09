// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const ReminderSchema = new Schema({
//     user:{
//         type: Schema.Types.ObjectId,
//         ref: 'user'
//     },
// 	_id:{
// 		type: Schema.Types.ObjectId,
// 		ref:'notes'
// 	},
//     title:{
//         type: String,
//         required: true
//     },
//     description:{
//         type: String,
//         required: true, 
//     },
//     deadline:{
//         type: Date,
//         default: Date.now
//     }
//   });

//   module.exports = mongoose.model('reminder', ReminderSchema);