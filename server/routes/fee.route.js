const express = require("express");
const router = express.Router();
const controller = require("../controllers/fee.controller.js");
router.get("/", controller.index);
// router.get("/fee/household/:id",controller.checkFee);
module.exports = router;