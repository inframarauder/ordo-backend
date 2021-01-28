const router = require("express").Router();
const { loginUser } = require("../controllers/auth.controller");

//routes for authentication:

router.post("/login", loginUser);

module.exports = router;
