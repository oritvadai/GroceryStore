const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    ID: Number,
    city: String,
    street: String,
    role: String

}, { versionKey: false });

const User = mongoose.model("User", UserSchema, "Users");

module.exports = User;
