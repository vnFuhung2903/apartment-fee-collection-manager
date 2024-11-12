const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String
})

const user = mongoose.model("users", userSchema);
module.exports=user;