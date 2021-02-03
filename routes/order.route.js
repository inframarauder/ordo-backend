const router = require("express").Router();
const {
	createOrder,
	addItemToOrder,
	changeQty,
} = require("../controllers/order.controller");

const { isAuthenticated, isManager } = require("../middlewares/authChecker");

router.post("/create", createOrder);
router.put("/add_item/:orderId", addItemToOrder);
router.put("/change_qty/:orderId", isAuthenticated, isManager, changeQty);

module.exports = router;
