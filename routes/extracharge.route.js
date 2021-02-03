const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authChecker");
const {
	createExtraCharge,
	listExtraCharges,
	readExtraCharge,
	updateExtraCharge,
	deleteExtraCharge,
} = require("../controllers/extraCharge.controller");

//extra charge apis

router.post("/create", isAuthenticated, isAdmin, createExtraCharge);
router.get("/list", listExtraCharges);
router.get("/read/:chargeId", isAuthenticated, isAdmin, readExtraCharge);
router.put("/update/:chargeId", isAuthenticated, isAdmin, updateExtraCharge);
router.delete("/delete/:chargeId", isAuthenticated, isAdmin, deleteExtraCharge);

module.exports = router;
