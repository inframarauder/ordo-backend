const Order = require("../models/order.model");
const Session = require("../models/session.model");
const { Unauthorized, Forbidden, NotFound } = require("../utils/error");
const {
	isValidOrderCreateRequest,
} = require("../utils/validators/order.validator");

exports.createOrder = async (req, res, next) => {
	try {
		const validRequest = isValidOrderCreateRequest(req.body);
		if (validRequest) {
			let session = await Session.findById(req.body.sessionId);
			if (!session) {
				throw new NotFound("Session not found!");
			} else if (session.status != "active") {
				throw new Forbidden("Session not validated or expired!");
			} else if (session.pin === parseInt(req.body.pin)) {
				throw new Unauthorized("Invalid Pin - Cant place order!");
			} else {
				const order = await new Order({
					...req.body,
					table: session.table,
				}).save();
				return res.status(201).json({
					orderId: order._id,
					message: `Order successully placed for table ${order.table}`,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
