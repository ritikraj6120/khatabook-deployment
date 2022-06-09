const connectToMongo = require('./db');
const express = require('express')
const path = require("path")
var cors = require('cors')
require('dotenv').config()
connectToMongo();
const app = express()
var port = process.env.PORT || 5000
app.use(cors({
	origin: 'http://localhost:3000/'
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))
// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/supplier', require('./routes/supplier'));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
	console.log(`Khatabook backend listening at http://localhost:${port}`)
})