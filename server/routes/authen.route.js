const express = require("express");
const controller = require("../controllers/authen.js");

const router = express.Router();
router.post("/api/v1/login", controller.signIn);
router.post("/api/v1/changePassword", controller.changePassword);
module.exports = router;