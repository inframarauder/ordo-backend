const mongoose = require("mongoose");
const deleteS3Object = require("../utils/deleteS3Object");

const menuItemSchema = new mongoose.Schema(
	{
		itemName: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		available: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
