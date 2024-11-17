const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  fee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'fees' },
  household_id: { type: mongoose.Schema.Types.ObjectId, ref: 'households' },
  amount: { type: Number, required: true },  
  payment_date: { type: Date, required: true },  
  status: { type: String, required: true }  
});

const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;
