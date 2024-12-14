const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  fee_id: { type: String, required: true },
  payment_id: { type: String, required: true, minlength: 8, maxlength: 8 },
  household_id: { type: String, required: true },
  amount: { type: Number, required: true },  
  payment_date: { type: Date, required: true },  
  status: { type: String, required: true }  
});

const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;