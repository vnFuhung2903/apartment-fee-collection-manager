const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller.js");
const checkApiKey = require("../middlewares/checkAIPkey.js");
router.get("/api/v1/payments", controller.index);
router.post("/api/v1/post",checkApiKey,controller.addPayment);
router.post("/api/v1/change",checkApiKey,controller.changePayment);
router.post("/api/v1/delete",checkApiKey,controller.deletePayment);
module.exports = router;