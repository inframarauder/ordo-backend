const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
	code: {
		type: Number,
		default: Math.floor(1000 + Math.random() * 9000),
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		default: "pending",
		enum: ["pending", "verified"],
	},
});

module.exports = mongoose.model("Otp", otpSchema);
