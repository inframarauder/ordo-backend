const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
	{
		order: {
			type: Object,
		},
		subTotal: {
			type: Number,
			default: 0,
		},
		extraCharges: [
			{
				type: Object,
			},
		],
		grandTotal: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
