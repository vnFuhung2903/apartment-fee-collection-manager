const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    fee_id: Schema.Types.ObjectId,
    household_id: Schema.Types.ObjectId,
    amount: Number,
    payment_date: Date
})

const payment = mongoose.model("payments", paymentSchema);
module.exports(payment);