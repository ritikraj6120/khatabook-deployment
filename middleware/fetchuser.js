var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
	// console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
		// console.log("big oooooooooo")
        req.user = data.user;
        next();
    } catch (error) {
		// console.log("oh my goddddddddddd");
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;