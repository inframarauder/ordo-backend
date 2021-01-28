const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authChecker");

//api routes for menu items and categories

const {
	createCategory,
	listCategories,
} = require("../controllers/menu.controller");

//category routes
router.post("/category/create", isAuthenticated, isAdmin, createCategory);
router.get("/category/list", isAuthenticated, isAdmin, listCategories);

module.exports = router;
