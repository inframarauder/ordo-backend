const Category = require("../models/category.model");
const MenuItem = require("../models/menuItem.model");
const { BadRequest, NotFound } = require("../utils/error");
const deleteS3Object = require("../utils/deleteS3Object");
const {
	isValidCategoryRequest,
	isValidMenuItemRequest,
} = require("../utils/validators/menu.validator");

exports.createCategory = async (req, res, next) => {
	try {
		const validRequest = isValidCategoryRequest(req.body);
		if (validRequest) {
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

exports.createMenuItem = async (req, res, next) => {
	try {
		const validRequest = isValidMenuItemRequest(req.body);
		if (validRequest) {
			const { DEFAULT_MENU_IMAGE } = process.env;
			const menuItem = await new MenuItem({
				...req.body,
				image:
					req.files && req.files.length > 0
						? req.files[0].location
						: DEFAULT_MENU_IMAGE,
			}).save();
			return res.status(201).json(menuItem);
		}
	} catch (error) {
		next(error);
	}
};

exports.listMenuItems = async (req, res, next) => {
	try {
		const menuItems = await MenuItem.aggregate([
			{
				$group: {
					_id: "$category",
					items: { $push: "$$ROOT" },
				},
			},
		]);
		return res.status(200).json(menuItems);
	} catch (error) {
		next(error);
	}
};

exports.readMenuItem = async (req, res, next) => {
	try {
		const menuItem = await MenuItem.findById(req.params.itemId).lean();
		if (!menuItem) {
			throw new NotFound("Menu item not found!");
		} else {
			return res.status(200).json(menuItem);
		}
	} catch (error) {
		next(error);
	}
};

exports.updateMenuItem = async (req, res, next) => {
	try {
		const update = { ...req.body };

		if (req.files && req.files.length > 0) {
			const item = await MenuItem.findById(req.params.itemId).lean();
			await deleteS3Object(item.image);
			update["image"] = req.files[0].location;
		}

		const menuItem = await MenuItem.findOneAndUpdate(
			{ _id: req.params.itemId },
			update,
			{ new: true, runValidators: true }
		).lean();

		if (!menuItem) {
			throw new NotFound("Menu item not found!");
		} else {
			return res.status(200).json(menuItem);
		}
	} catch (error) {
		next(error);
	}
};

exports.deleteMenuItem = async (req, res, next) => {
	try {
		const menuItem = await MenuItem.findById(req.params.itemId);
		await deleteS3Object(menuItem.image);
		await menuItem.delete();
		return res.status(204).json({ status: "Menu item Deleted" });
	} catch (error) {
		next(error);
	}
};
