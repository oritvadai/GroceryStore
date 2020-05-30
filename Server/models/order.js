const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    // price: Number, // sum of items total prices? 
    city: String,
    street: String,
    deliveryDate: Date,
    orderDate: Date,
    creditCard: Number
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
 });

OrderSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

// OrderSchema.virtual("totalPrice").get(function(){
//     return // sum all the itemsPrice 
// });

const Order = mongoose.model("Order", OrderSchema, "Orders");

module.exports = Order;
