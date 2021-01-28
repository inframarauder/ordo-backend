const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
	try {
		const { username, password, type } = req.body;
		const user = await User.findOne({ username, type });
		if (!user) {
			return res.status(404).json({ error: "User not found!" });
		} else {
			let valid = await bcrypt.compare(password, user.password);
			if (valid) {
				const token = user.createToken();
				return res.status(201).json({
					token,
					user: {
						_id: user._id,
						type: user.type,
					},
				});
			} else {
				return res.status(401).json({ error: "Passwords do not match!" });
			}
		}
	} catch (error) {
		console.error("Error in login\n", error);
		return res.sendStatus(500);
	}
};
