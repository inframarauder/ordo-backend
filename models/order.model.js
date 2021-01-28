const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		table: {
			type: Number,
			required: true,
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customer",
			required: true,
		},
		orderedItems: [
			{
				item: {
					type: Object,
				},
				qty: {
					type: Number,
				},
			},
		],
		billGenerated: {
			type: Boolean,
			default: false,
		},
		bill: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bill",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
