const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const householdSchema = new mongoose.Schema({
    head: { type: Schema.Types.ObjectId, ref: 'persons'},
    contact_phone: String,
    apartments: [{ type: Schema.Types.ObjectId, ref: 'apartments'}],
    members: [ { type: Schema.Types.ObjectId, ref: 'persons'} ]
})

const household = mongoose.model("households", householdSchema);
module.exports=household;