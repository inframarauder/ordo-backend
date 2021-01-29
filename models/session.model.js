const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	orders: [
		{
			type: Object,
		},
	],
	status: {
		type: String,
		enum: ["active", "expired"],
		default: "active",
	},
});

module.exports = mongoose.model("Session", sessionSchema);
