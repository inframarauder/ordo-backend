const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
	},
	isPhoneVerified: {
		type: Boolean,
		default: false,
	},
	pin: {
		type: Number,
	},
	orders: [
		{
			type: Object,
		},
	],
	status: {
		type: String,
		enum: ["created", "active", "expired"],
		default: "created",
	},
});

module.exports = mongoose.model("Session", sessionSchema);
