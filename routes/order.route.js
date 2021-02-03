const router = require("express").Router();
const {
	createOrder,
	addItemToOrder,
	changeQty,
	removeItem,
	listOrdersByTable,
	deleteOrder,
} = require("../controllers/order.controller");

const { isAuthenticated, isManager } = require("../middlewares/authChecker");

router.post("/create", createOrder);
router.put("/add_item/:orderId", addItemToOrder);
router.put("/change_qty/:orderId", isAuthenticated, isManager, changeQty);
router.put("/remove_item/:orderId", isAuthenticated, isManager, removeItem);
router.get("/list_by_table", isAuthenticated, isManager, listOrdersByTable);
router.delete("/delete/:orderId", isAuthenticated, isManager, deleteOrder);

module.exports = router;
