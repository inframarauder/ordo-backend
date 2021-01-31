const ExtraCharge = require("../models/extraCharge.model");
const { NotFound, BadRequest } = require("../utils/error");
const {
	isValidChargeCreationRequest,
	isValidChargeUpdateRequest,
} = require("../utils/validators/extraCharge.validator");

exports.createExtraCharge = async (req, res, next) => {
	try {
		const validRequest = isValidChargeCreationRequest(req.body);
		if (validRequest) {
			let charge = await ExtraCharge.findOne({ name: req.body.name });
			if (charge) {
				throw new BadRequest(`Charge "${req.body.name}" already exists`);
			} else {
				charge = await new ExtraCharge(req.body).save();
				return res.status(201).json(charge);
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.listExtraCharges = async (req, res, next) => {
	try {
		const charges = await ExtraCharge.find().sort({ _id: -1 }).lean();
		return res.status(200).jsoN(charges);
	} catch (error) {
		next(error);
	}
};

exports.readExtraCharge = async (req, res, next) => {
	try {
		const charge = await ExtraCharge.findById(req.params.chargeId).lean();
		if (charge) {
			return res.status(200).json(charge);
		} else {
			throw new NotFound("Charge not found");
		}
	} catch (error) {
		next(error);
	}
};

exports.updateExtraCharge = async (req, res, next) => {
	try {
		const validRequest = isValidChargeUpdateRequest(req.body);
		if (validRequest) {
			const charge = await ExtraCharge.findByIdAndUpdate(
				req.params.chargeId,
				req.body,
				{ new: true, runValidators: true }
			).lean();
			if (charge) {
				return res.status(200).json(charge);
			} else {
				throw new NotFound("Charge not found");
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.deleteExtraCharge = async (req, res, next) => {
	try {
		await ExtraCharge.findByIdAndDelete(req.params.chargeId);
		return res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
