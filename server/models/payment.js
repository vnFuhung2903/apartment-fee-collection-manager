const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    fee_id: String,
    household_id: String,
    amount: Number,
    payment_date: Date
})

const payment = mongoose.model("payments", paymentSchema);
module.exports = payment;