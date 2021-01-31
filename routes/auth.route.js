const router = require("express").Router();
const {
	loginUser,
	signupWaiter,
	createSession,
	validateSession,
} = require("../controllers/auth.controller");
const {
	isAuthenticated,
	isAdmin,
	isWaiter,
} = require("../middlewares/authChecker");

//routes for authentication:

router.post("/login", loginUser);
router.post("/signup_waiter", isAuthenticated, isAdmin, signupWaiter);
router.post("/create_session", isAuthenticated, isWaiter, createSession);
router.put(
	"/validate_session/:sessionId",
	isAuthenticated,
	isWaiter,
	validateSession
);

module.exports = router;
