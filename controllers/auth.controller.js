const User = require("../models/user.model");
const Session = require("../models/session.model");
const {
	isValidLoginRequest,
	isValidSignupRequest,
	isValidSessionRequest,
	isValidSessionValidationRequest,
} = require("../utils/validators/auth.validator");
const { NotFound, Unauthorized, BadRequest } = require("../utils/error");
const { sendOTP, sendMenuLink } = require("../utils/email");

const bcrypt = require("bcryptjs");
const axios = require("axios");

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

exports.createSession = async (req, res, next) => {
	try {
		const validRequest = isValidSessionRequest(req.body);
		if (validRequest) {
			const session = await new Session(req.body).save();
			const otpResponse = await axios.post(
				"http://localhost:5000/api/otp/create",
				{
					email: session.email,
				}
			);
			if (otpResponse.status === 201) {
				sendOTP(session.email, otpResponse.data.code);
				return res.status(201).json({
					sessionId: session._id,
					message: `Session created.OTP sent to ${session.email}`,
				});
			} else {
				throw new Error("Internal Server Error");
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.validateSession = async (req, res, next) => {
	try {
		const validRequest = isValidSessionValidationRequest(req.body);
		if (validRequest) {
			const session = await Session.findById(req.params.sessionId);
			if (session) {
				const otpResponse = await axios.post(
					"http://localhost:5000/api/otp/verify",
					{ email: session.email, code: req.body.code }
				);
				if (otpResponse.status === 200) {
					session.isEmailVerified = true;
					session.pin = Math.floor(1000 + Math.random() * 9000);
					session.status = "active";
					await session.save();
					sendMenuLink(session);
					return res.status(200).json({
						pin: session.pin,
						message: `Session is now active.`,
					});
				} else if (otpResponse.status === 400) {
					return res.status(400).json({ error: otpResponse.error.data.error });
				} else {
					throw new Error("Internal Server Error!");
				}
			} else {
				throw new NotFound("Session not found. Might not have been created!");
			}
		}
	} catch (error) {
		next(error);
	}
};
