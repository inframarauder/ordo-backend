const router = require("express").Router();
const {
	createOrder,
	addItemToOrder,
} = require("../controllers/order.controller");

const { isAuthenticated, isManager } = require("../middlewares/authChecker");

router.post("/create", createOrder);
router.put("/add_item/:orderId", addItemToOrder);
router.put("/remove_item/:orderId", isAuthenticated, isManager);

module.exports = router;
