const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const fetchadmin = require('../middleware/fetchadmin');
const User = require('../models/User');
// const Reminder = require('../models/Reminder');
const { body, validationResult } = require('express-validator');





// Route 1:Get All User Details using: GET "/api/user/getusers". Admin required
router.get('/fetchUserList', fetchuser,fetchadmin, async (req, res) => {

	try {
		// console.log("hello")
		// console.log(req.user.id)
		const user = await User.find().select("-password");
		// console.log(user);
		res.status(200).json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
router.post('/deleteuser/:id', fetchuser, fetchadmin, async (req, res) => {
	try {
		// Find the note to be delete and delete it
		let user = await User.findById(req.params.id);
		if (!user) { return res.status(404).send("Not Found") }
	
		user = await User.findByIdAndDelete(req.params.id)
		res.status(200).json({ user: user });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})




module.exports = router