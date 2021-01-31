const Otp = require("../models/otp.model");
const { NotFound, BadRequest } = require("../utils/error");

exports.createOTP = async (req, res, next) => {
	try {
		let otp = await Otp.findOne({ email: req.body.email, status: "verified" });
		if (otp) {
			otp.code = Math.floor(1000 + Math.random() * 9000);
			otp.status = "pending";
		} else {
			otp = new Otp({ email: req.body.email });
		}
		await otp.save();
		return res.status(201).json({ code: otp.code });
	} catch (error) {
		next(error);
	}
};

exports.verifyOTP = async (req, res, next) => {
	try {
		const otp = await Otp.findOne({ email: req.body.email, status: "pending" });
		if (otp) {
			if (parseInt(req.body.code) === otp.code) {
				otp.status = "verified";
				await otp.save();
				return res.status(200).json({ status: "verified" });
			} else {
				throw new BadRequest("Code does not match, try again.");
			}
		} else {
			throw new NotFound("Otp not generated against this email!");
		}
	} catch (error) {
		next(error);
	}
};
