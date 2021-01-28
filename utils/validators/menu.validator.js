const Joi = require("joi");
const { BadRequest } = require("../error");

exports.isValidCategoryRequest = (body) => {
	const schema = Joi.object({
		name: Joi.string().required(),
	});
	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};

exports.isValidMenuItemRequest = (body) => {
	const schema = Joi.object({
		itemName: Joi.string().required(),
		category: Joi.string().required(),
		price: Joi.number().required(),
		description: Joi.string(),
		available: Joi.boolean(),
	});

	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};
