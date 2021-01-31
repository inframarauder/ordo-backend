const router = require("express").Router();
const {
	createOrder,
	addItemToOrder,
} = require("../controllers/order.controller");

const { isAuthenticated, isManager } = require("../middlewares/authChecker");

router.post("/create", createOrder);
router.put("/add_item/:orderId", addItemToOrder);

module.exports = router;
