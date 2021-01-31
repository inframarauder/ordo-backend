const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		table: {
			type: Number,
			required: true,
		},
		session: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Session",
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
