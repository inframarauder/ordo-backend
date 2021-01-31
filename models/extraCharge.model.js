const mongoose = require("mongoose");

const extraChargeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			enum: ["percentage", "fixed"],
			default: "percentage",
		},
		value: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ExtraCharge", extraChargeSchema);
