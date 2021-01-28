const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { isValidLoginRequest } = require("../utils/validators/auth.validator");
const { NotFound, Unauthorized } = require("../utils/error");

exports.loginUser = async (req, res, next) => {
	try {
		const validRequest = isValidLoginRequest(req.body);
		if (validRequest) {
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
		}
	} catch (error) {
		next(error);
	}
};
