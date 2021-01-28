const Category = require("../models/category.model");
const MenuItem = require("../models/menuItem.model");
const { BadRequest, NotFound } = require("../utils/error");
const {
	isValidCategoryRequest,
} = require("../utils/validators/menu.validator");

exports.createCategory = async (req, res, next) => {
	try {
		const valid = isValidCategoryRequest(req.body);
		if (valid) {
			let category = await Category.findOne({ name: req.body.name });
			if (category) {
				throw new BadRequest(`Category "${req.body.name}" already exists`);
			} else {
				category = await new Category(req.body).save();
				return res.status(201).json(category);
			}
		}
	} catch (error) {
		next(error);
	}
};

exports.listCategories = async (req, res, next) => {
	try {
		let categories = await Category.find({}, { name: 1, _id: 0 })
			.sort({ name: 1 })
			.lean();
		categories = categories.map((cat) => cat.name);

		return res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};
