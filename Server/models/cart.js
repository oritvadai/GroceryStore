const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CartSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

CartSchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "cartId"
});

const Cart = mongoose.model("Cart", CartSchema, "Carts");

module.exports = Cart;
