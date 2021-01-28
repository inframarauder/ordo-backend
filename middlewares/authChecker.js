const { func } = require("joi");
const jwt = require("jsonwebtoken");

//middleware to protect routes
exports.isAuthenticated = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: "User not authorized!" });
	}
	let token = req.headers.authorization.split(" ")[1];
	if (!token) {
		return res.status(403).json({ error: "Access denied, no token provided!" });
	} else {
		try {
			const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
			req.user = payload.user;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res
					.status(401)
					.json({ error: "Session timed out,please login again" });
			} else if (error.name === "JsonWebTokenError") {
				return res
					.status(401)
					.json({ error: "Invalid token,please login again!" });
			} else {
				console.error(error);
				return res.status(400).json({ error });
			}
		}
	}
};

//middleware to check admin only access
exports.isAdmin = (req, res, next) => {
	allow(["admin"], req, res, next);
};

//middleware to check admin and manager access
exports.isManager = (req, res, next) => {
	allow(["admin", "manager"], req, res, next);
};

function allow(levels, req, res, next) {
	if (levels.includes(req.user.type)) {
		next();
	} else {
		return res.status(403).json({ error: "Insufficient permissions!" });
	}
}
