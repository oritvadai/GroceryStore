const Cart = require("../models/cart");

function getCartByUserAsync(userId) {
    return Cart.findOne({ userId }).exec();
};

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
