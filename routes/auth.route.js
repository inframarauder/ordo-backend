const router = require("express").Router();

//routes for authentication:

router.post("/login", (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
