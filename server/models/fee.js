const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    due: Date | null,
    status: String
})

const fee = mongoose.model("fees", feeSchema);
module.exports=fee;