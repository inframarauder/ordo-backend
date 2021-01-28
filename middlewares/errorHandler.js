const { GeneralError } = require("../configs/error");

module.exports = (err, req, res, next) => {
	if (err instanceof GeneralError) {
		const code = err.getCode();
		return res.status(code).json({
			error: err.message,
		});
	} else {
		return res.status(500).json({
			error: "Internal Server Error!",
		});
	}
};
