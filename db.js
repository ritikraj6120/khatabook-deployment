const mongoose = require('mongoose');
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI;
const connectToMongo = () => {
	mongoose.connect(MONGO_URI, () => {
		console.log("Connected to Mongo Successfully");
	})
}

module.exports = connectToMongo;