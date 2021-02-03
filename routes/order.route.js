const router = require("express").Router();
const {
	createOrder,
	addItemToOrder,
	changeQty,
	removeItem,
} = require("../controllers/order.controller");

const { isAuthenticated, isManager } = require("../middlewares/authChecker");

router.post("/create", createOrder);
router.put("/add_item/:orderId", addItemToOrder);
router.put("/change_qty/:orderId", isAuthenticated, isManager, changeQty);
router.put("/remove_item/:orderId", isAuthenticated, isManager, removeItem);

module.exports = router;
