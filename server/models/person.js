const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    gender: String,
    relation_to_owner: String,
    temporary_absence: Boolean,
    temporary_residence: Boolean,
    religion: String,
    nation: String,
    nation_id: Number,
    movingIn: Date,
    contact_phone: Number
})

const person = mongoose.model("persons", personSchema);
module.exports=person;