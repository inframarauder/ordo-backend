const router = require("express").Router();
const authRoutes = require("./auth.route");
const menuRoutes = require("./menu.route");
const otpRoutes = require("./otp.route");
const extraChargeRoutes = require("./extracharge.route");

router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);
router.use("/otp", otpRoutes);
router.use("/extra_charge", extraChargeRoutes);

module.exports = router;
