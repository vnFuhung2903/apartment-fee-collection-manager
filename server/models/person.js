const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    relation_to_owner: String,
    temporary_absence: Boolean,
    temporary_residence: Boolean
})

const person = mongoose.model("persons", personSchema);
module.exports(person);