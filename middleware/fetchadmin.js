const User = require('../models/User');
const fetchadmin = async (req, res, next) => {
	// Get the user from the jwt token and add id to req object
	console.log(req);
	let admintoken = req.header('admin-token');
	console.log(req.header('admin-token'));
	if (admintoken !== 'true') {
		console.log("hi");
		res.status(401).send({ error: "Not a valid admin" })
	}
	else {
		try {
			const userid = req.user.id;
			const user = await User.findById(userid);
			let check= 'true'===admintoken
			console.log("hello");
			console.log(check);
			console.log(user.isadmin)
			if (user.isadmin === check )
				next();
			else {
				
				res.status(401).send({ error: "Please authenticate using a valid token" })
			}
		} catch (error) {
			// console.log("oh my goddddddddddd");
			res.status(500).send({ error: "internal server error" })
		}
	}

}

// req.user.id
module.exports = fetchadmin;