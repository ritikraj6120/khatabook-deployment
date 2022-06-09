const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get User Details using: GET "/api/user/getuser". Login required
router.get('/fetchuserdetails', fetchuser, async (req, res) => {
	try {
		const user = await User.find({ _id : req.user.id }).select('-isadmin -password');
		res.status(200).json(user)
	} 
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports=router;