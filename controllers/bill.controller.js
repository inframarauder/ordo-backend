const Bill = require("../models/bill.model");
const Order = require("../models/order.model");
const ExtraCharge = require("../models/extraCharge.model");
const Session = require("../models/session.model");

const { NotFound } = require("../utils/error");

exports.generateBill = async (req, res, next) => {
	try {
		//retrieve order
		const order = await Order.findById(req.body.orderId);
		if (!order) {
			throw new NotFound("Order not found!");
		}
		//calculate subtotal
		let subTotal = 0;
		order.orderedItems.forEach((orderedItem) => {
			subTotal += orderedItem.item.price * orderedItem.qty;
		});

		//calculate extra charges
		const extraCharges = await ExtraCharge.find().lean();
		let billExtraCharges = [];
		extraCharges.forEach((charge) => {
			let { name, type, value } = charge;
			let description, amount;
			if (type === "percentage") {
				description = `${value}% of Rs. ${subTotal}`;
				amount = (value / 100) * subTotal;
			}
			if (type === "fixed") {
				description = `Rs. ${value}`;
				amount = value;
			}
			billExtraCharges.push({ name, description, amount });
		});

		//calculate grand total
		let grandTotal = subTotal;
		billExtraCharges.forEach((charge) => {
			grandTotal += charge.amount;
		});

		//create new bill object and save to DB
		const bill = await new Bill({
			order: order._id,
			subTotal,
			billExtraCharges,
			grandTotal,
		}).save();

		//update order bill status :
		order.billGenerated = true;
		order.bill = bill._id;
		await order.save();

		//add order to session and expire session:
		await Session.findByIdAndUpdate(
			order.session,
			{ status: "expired", $push: { orders: order } },
			{ new: true, runValidators: true }
		);

		//send response:
		return res.status(201).json(bill);
	} catch (error) {
		next(error);
	}
};
