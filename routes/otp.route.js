const router = require("express").Router();
const { createOTP, verifyOTP } = require("../controllers/otp.controller");

router.post("/create", createOTP);
router.post("/verify", verifyOTP);

module.exports = router;
