const Joi = require("joi");
const { BadRequest } = require("../../utils/error");

exports.isValidChargeCreationRequest = (body) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		type: Joi.string().valid("percentage", "fixed"),
		value: Joi.number()
			.required()
			.min(0)
			.when("type", {
				is: "percentage",
				then: Joi.number().required().max(100),
			}),
	});

	const { error } = schema.validate(body);
	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};

exports.isValidChargeUpdateRequest = (body) => {
	const schema = Joi.object({
		name: Joi.string(),
		type: Joi.string().valid("percentage", "fixed"),
		value: Joi.number()
			.min(0)
			.when("type", {
				is: "percentage",
				then: Joi.number().max(100),
			}),
	});

	const { error } = schema.validate(body);
	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};
