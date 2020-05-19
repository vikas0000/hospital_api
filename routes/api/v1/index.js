const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../../middleware/auth");
const { register_patient } = require("../../../controllers/v1/patients");

// Handling v1 routes
router.use("/doctors", require("./doctors"));

// Can access this route only if doctor is logged in
router.post("/register_patient", checkAuth, register_patient);

router.use("/patients", require("./patients"));
router.use("/reports", require("./reports"));

module.exports = router;
