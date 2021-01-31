const Joi = require("joi");
const { BadRequest } = require("../error");

exports.isValidLoginRequest = (body) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
		type: Joi.string().required().valid("manager", "admin", "waiter"),
	});
	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};

exports.isValidSignupRequest = (body) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required().min(6),
	});
	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};

exports.isValidSessionRequest = (body) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		table: Joi.number().required(),
	});
	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};

exports.isValidSessionValidationRequest = (body) => {
	const schema = Joi.object({
		code: Joi.string().required().length(4),
	});
	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};
