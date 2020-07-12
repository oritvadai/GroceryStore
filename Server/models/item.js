const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
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

ItemSchema.virtual("itemsPrice").get(function () {
    return this.quantity * this.product.unitPrice;
});

const Item = mongoose.model("Item", ItemSchema, "Items");

module.exports = Item;
