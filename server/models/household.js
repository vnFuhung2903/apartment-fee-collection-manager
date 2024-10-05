const mongoose = require("mongoose");
const person = require("./person");

const householdSchema = new mongoose.Schema({
    owner: String,
    contact_phone: String,
    apartment_number: Number,
    member: [ person ]
})

const household = mongoose.model("households", householdSchema);
module.exports=household;