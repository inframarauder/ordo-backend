const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
	{
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
		subTotal: {
			type: Number,
			default: 0,
		},
		billExtraCharges: [
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
