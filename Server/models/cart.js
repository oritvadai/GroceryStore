const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date,
    totalPrice: Number
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CartSchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "cartId"
});

const Cart = mongoose.model("Cart", CartSchema, "Carts");

module.exports = Cart;
