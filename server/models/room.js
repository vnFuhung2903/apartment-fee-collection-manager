const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    room_id: String,
    type: String,
    totaArea: Number

})

const room = mongoose.model("rooms", userSchema);
module.exports=room;