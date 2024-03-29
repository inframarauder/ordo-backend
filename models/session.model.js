const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	table: {
		type: Number,
		required: true,
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
