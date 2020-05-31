const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    category: String

}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CategorySchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "categoryId"
});

const Category = mongoose.model("Category", CategorySchema, "Categories");

module.exports = Category;
