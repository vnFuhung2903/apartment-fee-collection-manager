const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    number: number,
    type: String,
    totaArea: Number

})

const room = mongoose.model("rooms", userSchema);
module.exports=room;