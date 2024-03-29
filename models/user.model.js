const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			enum: ["manager", "admin", "waiter"],
			default: "waiter",
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.methods.createToken = function () {
	try {
		const { JWT_PRIVATE_KEY } = process.env;
		const user = { _id: this._id, type: this.type };
		return jwt.sign({ user }, JWT_PRIVATE_KEY);
	} catch (error) {
		console.error("Error in jwt generation\n", error);
	}
};

userSchema.pre("save", async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		}

		return next();
	} catch (error) {
		console.error("Error in password hashing\n", error);
	}
});

module.exports = mongoose.model("User", userSchema);
