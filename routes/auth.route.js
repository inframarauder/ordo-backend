const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

//routes for authentication:

router.post("/login", AuthController.loginUser);

module.exports = router;
