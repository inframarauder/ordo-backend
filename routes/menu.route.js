const router = require("express").Router();

//api routes for menu items and categories

const {
	createCategory,
	listCategories,
} = require("../controllers/menu.controller");

//category routes
router.post("/category/create", createCategory);
router.get("/category/list", listCategories);

module.exports = router;
