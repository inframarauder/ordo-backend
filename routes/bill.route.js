const router = require("express").Router();
const { isAuthenticated, isManager } = require("../middlewares/authChecker");
const { generateBill } = require("../controllers/bill.controller");

router.post("/generate_bill", isAuthenticated, isManager, generateBill);

module.exports = router;
