const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    totalPrice: Number, // quantity * product price??
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
 });

ItemSchema.virtual("product", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

ItemSchema.virtual("cart", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const Item = mongoose.model("Item", ItemSchema, "Items");

module.exports = Item;
