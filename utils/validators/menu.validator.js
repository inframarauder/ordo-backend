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
