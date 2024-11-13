const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'households' },
    number: Number,
    type: String,
    totalArea: Number

})

const apartment = mongoose.model("apartment", apartmentSchema);
module.exports=apartment;