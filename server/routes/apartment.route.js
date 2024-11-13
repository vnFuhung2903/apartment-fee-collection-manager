const express = require("express");
const router = express.Router();
const controller = require("../controllers/apartment.controller.js");
router.get("/api/v1/apartments", controller.index);

module.exports = router;