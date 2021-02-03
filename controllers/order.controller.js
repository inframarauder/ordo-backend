const Order = require("../models/order.model");
const Session = require("../models/session.model");
const { Unauthorized, Forbidden, NotFound } = require("../utils/error");
const {
	isValidOrderCreateRequest,
	isValidAddItemRequest,
	isValidReduceRequest,
	isValidRemoveRequest,
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
			} else if (session.pin !== req.body.pin) {
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

exports.addItemToOrder = async (req, res, next) => {
	try {
		const validRequest = isValidAddItemRequest(req.body);
		if (validRequest) {
			const { item, qty } = req.body;
			const update = {
				$push: {
					orderedItems: { item, qty },
				},
			};

			const order = await Order.findByIdAndUpdate(req.params.orderId, update, {
				new: true,
				runValidators: true,
			}).lean();
			if (order) {
				return res.status(200).json({
					orderId: order._id,
					message: `Order for table ${order.table} successfully updated!`,
				});
			} else {
				throw new NotFound("Order not found!");
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.changeQty = async (req, res, next) => {
	try {
		const validRequest = isValidReduceRequest(req.body);
		if (validRequest) {
			const order = await Order.findOneAndUpdate(
				{ _id: req.params.orderId, "orderedItems._id": req.body.orderedItemId },
				{ $set: { "orderedItems.$.qty": req.body.qty } },
				{ new: true, runValidators: true }
			);
			if (order) {
				return res.status(200).json({
					orderId: order._id,
					message: `Order for table ${order.table} successfully updated!`,
				});
			} else {
				throw new NotFound("Order not found!");
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.removeItem = async (req, res, next) => {
	try {
		const validRequest = isValidRemoveRequest(req.body);
		if (validRequest) {
			const order = await Order.findByIdAndUpdate(
				req.params.orderId,
				{ $pull: { orderedItems: { _id: req.body.orderedItemId } } },
				{ new: true, runValidators: true }
			);
			if (order) {
				return res.status(200).json({
					orderId: order._id,
					message: `Order for table ${order.table} successfully updated!`,
				});
			} else {
				throw new NotFound("Order not found");
			}
		}
	} catch (error) {
		next(error);
	}
};
