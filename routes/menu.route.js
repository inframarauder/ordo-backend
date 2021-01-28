//api routes for menu items and categories

const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authChecker");
const {
	createCategory,
	listCategories,
	createMenuItem,
	listMenuItems,
	readMenuItem,
	updateMenuItem,
	deleteMenuItem,
} = require("../controllers/menu.controller");

//category routes
router.post("/category/create", isAuthenticated, isAdmin, createCategory);
router.get("/category/list", isAuthenticated, isAdmin, listCategories);

//menu item routes
router.get("/items/list", listMenuItems);
router.get("/items/read/:itemId", readMenuItem);
router.post("/items/create", isAuthenticated, isAdmin, createMenuItem);
router.put("/items/update/:itemId", isAuthenticated, isAdmin, updateMenuItem);
router.delete(
	"/items/delete/:itemId",
	isAuthenticated,
	isAdmin,
	deleteMenuItem
);

module.exports = router;
