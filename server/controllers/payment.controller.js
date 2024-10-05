const Payment = require("../models/payment.js");

//[GET] /payment
module.exports.index = async (req,res) => {
    const payment = await Payment.find();
    res.json(payment);
}