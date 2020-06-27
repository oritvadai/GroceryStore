const Cart = require("../models/cart");
const Item = require("../models/item");

function getCartByUserAsync(userId) {
    return Cart.findOne({ userId }).populate({ 
        path: "items",
        populate: {
          path: "product",
        }
     }).exec();
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
