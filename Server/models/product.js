const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productName: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    price: Number,
    picFileName: String

}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
 });

ProductSchema.virtual("category", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const Product = mongoose.model("Product", ProductSchema, "Products");

module.exports = Product;
