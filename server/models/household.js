const mongoose = require("mongoose");

const householdSchema = new mongoose.Schema({
    head: Schema.Types.ObjectId,
    contact_phone: String,
    apartments: [Schema.Types.ObjectId],
    member: [ Schema.Types.ObjectId ]
})

const household = mongoose.model("households", householdSchema);
module.exports=household;