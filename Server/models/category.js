const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    category: String

}, { versionKey: false });

const Category = mongoose.model("Category", CategorySchema, "Categories");

module.exports = Category;
