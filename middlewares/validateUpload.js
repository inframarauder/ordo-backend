const upload = require("../utils/upload");

module.exports = (req, res, next) => {
	const checkUpload = upload.any();

	checkUpload(req, res, (err) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		} else {
			next();
		}
	});
};
