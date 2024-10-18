const express = require("express");
const router = express.Router();
const controller = require("../controllers/fee.controller.js");
router.get("/api/v1/fees", controller.index);
router.post("/api/v1/post",controller.addFee);
module.exports = router;