const express = require("express");
const router = express.Router();
const { status } = require("../../../controllers/v1/reports");

router.get("/:status", status);

module.exports = router;
