const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {
	isValidLoginRequest,
	isValidSignupRequest,
} = require("../utils/validators/auth.validator");
const { NotFound, Unauthorized, BadRequest } = require("../utils/error");

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

exports.signupWaiter = async (req, res, next) => {
	try {
		let validRequest = isValidSignupRequest(req.body);
		if (validRequest) {
			let user = await User.findOne({ username: req.body.username });
			if (user) {
				throw new BadRequest("This username already exists.");
			} else {
				user = await new User({ ...req.body, type: "waiter" }).save();
				const token = user.createToken();
				return res.status(201).json({
					token,
					user: {
						_id: user._id,
						type: user.type,
					},
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
