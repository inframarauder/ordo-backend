const router = require("express").Router();
const authRoutes = require("./auth.route");
const menuRoutes = require("./menu.route");

router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);

module.exports = router;
