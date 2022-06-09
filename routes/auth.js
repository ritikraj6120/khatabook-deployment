const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/signup', [
	body('fname', 'Enter a valid name').isLength({ min: 1 }),
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

	// console.log(req);
	let isAuthenticated = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ isAuthenticated, error: errors.array() });
	}
	try {
		// Check whether the user with this email exists already
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(409).json({ isAuthenticated, error: "Sorry a user with this e-mail address already exists" })
		}
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);

		// Create a new user
		user = await User.create({
			fname: req.body.fname,
			lname: req.body.lname,
			password: secPass,
			email: req.body.email,
		});
		// res.json(user)
		isAuthenticated = true;

		return res.status(200).json({ isAuthenticated })
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password cannot be blank').exists(),
],
	async (req, res) => {
		let success = false;
		// If there are errors, return Bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}

			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}
			// console.log(user._id);
			const data = {
				user: {
					id: user.id
				}
			}
			const authtoken = jwt.sign(data, JWT_SECRET);
			success = true;
			return res.status(200).json({ success, authtoken });

		} catch (error) {
			console.error(error.message);
			res.status(500).json({ success: false, error: "Internal Server Error" });
		}
	});


// ROUTE 3: Get loggedin User Details using: GET "/api/auth/getuser". Login required
router.get('/fetchuserdetails', fetchuser, async (req, res) => {

	try {
		let userId = req.user.id;
		const user = await User.findById(userId).select('-password -__v')
		res.status(200).json(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 4: Update Password using: POST "/api/auth/changepassword". Login required
router.post('/changepassword', fetchuser, async (req, res) => {
	try {
		let { currentPassword, newPassword } = req.body;
		let user = await User.findById(req.user.id);
		const oldPasswordCompare = await bcrypt.compare(currentPassword, user.password);
		if (!oldPasswordCompare) {
			return res.status(400).json("Current Password is not Correct");
		}
		else {
			const newUser = {};
			const salt = await bcrypt.genSalt(10);
			newPassword = await bcrypt.hash(newPassword, salt);
			newUser.password = newPassword;
			const updatePassword = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true })
			return res.status(200).json("Password Updated Successfully");
		}
	}
	catch (err) {
		console.log(err);
		return res.status(500).json("Internal Server Happenend");
	}
})
module.exports = router