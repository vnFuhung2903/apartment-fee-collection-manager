const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  fee_id: { type: String, required: true },
  household_id: { type: String, required: true },
  amount: { type: Number, required: true },  
  payment_date: { type: Date, required: true },  
  status: { type: String, required: true }  
});

const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;