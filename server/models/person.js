const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    gender: String,
    dob: Date,
    relation_to_owner: String,
    status: String
})

const person = mongoose.model("persons", personSchema);
module.exports(person);