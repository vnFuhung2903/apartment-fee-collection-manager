const express = require('express');
const controller = require("../controllers/household.controller");

const router = express.Router();
router.get("/api/v1/all", controller.getHouseholds);
router.get("/api/v1/detail", controller.getHouseholdDetail);
router.post("/api/v1/create", controller.createHousehold);
router.post("/api/v1/edit", controller.editHousehold);
router.post("/api/v1/delete", controller.deleteHousehold);

module.exports = router;