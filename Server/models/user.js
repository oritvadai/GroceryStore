const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    ID: Number,
    password: String,
    city: String,
    street: String,
    role: String

}, { versionKey: false });

const User = mongoose.model("User", UserSchema, "Users");

module.exports = User;
