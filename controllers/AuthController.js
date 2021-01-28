const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { NotFound, Unauthorized } = require("../configs/error");

exports.loginUser = async (req, res, next) => {
	try {
		const { username, password, type } = req.body;
		const user = await User.findOne({ username, type });
		if (!user) {
			throw new NotFound("User not found!");
		} else {
			let valid = await bcrypt.compare(password, user.password);
			if (valid) {
				const token = user.createToken();
				return res.status(201).json({
					token,
					user: {
						_id: user._id,
						type: user.type,
					},
				});
			} else {
				throw new Unauthorized("Passwords do not match!");
			}
		}
	} catch (error) {
		console.error("Error in login\n", error);
		next(error);
	}
};
