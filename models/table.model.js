const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
	{
		tableNumber: {
			type: Number,
			required: true,
		},
		orderingLink: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
