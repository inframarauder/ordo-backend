const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
	{
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},
		email: {
			type: String,
		},
		name: {
			type: String,
		},
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
