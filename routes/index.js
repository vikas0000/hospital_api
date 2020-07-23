const express = require("express");
const router = express.Router();

// Handling all routes
router.use("/doctors", require("./doctors"));

module.exports = router;
