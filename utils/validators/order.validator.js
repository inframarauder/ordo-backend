const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { BadRequest } = require("../error");

exports.isValidOrderCreateRequest = (body) => {
	const schema = Joi.object({
		sessionId: Joi.required().objectId(),
		pin: Joi.number().required().min(1000).max(9999),
		items: Joi.array()
			.required()
			.items(
				Joi.object({
					item: Joi.object({
						_id: Joi.required().objectId(),
						itemName: Joi.string().required(),
						price: Joi.number().required(),
					}),
					qty: Joi.number().required(),
				})
			),
	});

	const { error } = schema.validate(body);

	if (error) {
		throw new BadRequest(error.details[0].message);
	} else {
		return true;
	}
};
