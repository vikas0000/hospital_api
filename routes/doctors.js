const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/v1/doctors");

router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);

module.exports = router;
