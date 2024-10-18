const express = require("express");
const router = express.Router();
const controller = require("../controllers/fee.controller.js");
router.get("/api/v1/fees", controller.index);
module.exports = router;