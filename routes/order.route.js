const router = require("express").Router();
const { createOrder } = require("../controllers/order.controller");

router.post("/create", createOrder);

module.exports = router;
