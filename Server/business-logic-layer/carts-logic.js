const Cart = require("../models/cart");
const Item = require("../models/item");

async function getCartByUserAsync(userId) {
    const cart = await Cart.findOne({ userId }).populate({
        path: "items",
        populate: {
            path: "product",
        }
    }).exec();

    const prices = cart.items.map(i => i.itemsPrice);
    const totalPrice = prices.reduce((a, b) => a + b, 0);

    cart.totalPrice = totalPrice.toFixed(2);

    return cart;
};

// function getLastCartByUser(userId) {
//     const lastCart =  Cart.findOne({ userId }, "date").sort({ orderDate: "desc" }).exec();
//     return lastCart;
// };

function addCartAsync(cart) {
    return cart.save();
};

// function updateCartAsync(cart) {
//     return Cart.updateOne({ _id: cart._id }, cart);
// };

module.exports = {
    getCartByUserAsync,
    addCartAsync,
    // updateCartAsync
};
