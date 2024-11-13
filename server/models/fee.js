const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  amount: Number,
  due: Date,
  status: String,
  household: [{ type: mongoose.Schema.Types.ObjectId, ref: 'household' }] 
});

const fee = mongoose.model("fees", feeSchema);
module.exports = fee;
