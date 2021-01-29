const router = require("express").Router();
const { loginUser, signupWaiter } = require("../controllers/auth.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/authChecker");

//routes for authentication:

router.post("/login", loginUser);
router.post("/signup_waiter", isAuthenticated, isAdmin, signupWaiter);

module.exports = router;
