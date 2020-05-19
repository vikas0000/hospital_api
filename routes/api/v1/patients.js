const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../../middleware/auth");
const { create_report, getReports } = require("../../../controllers/v1/patients");

// Can access this route only if doctor is logged in
router.post("/:id/create_report", checkAuth, create_report);

router.get("/:id/all_reports", getReports);

module.exports = router;
