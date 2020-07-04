const Cart = require("../models/cart");
const Order = require("../models/order");

async function getCartByIdAsync(_id) {
    const cart = await Cart.findOne({ _id }).populate({
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

function getOpenCartByUserAsync(userId) {
    // get the last cart of the user
    const lastCart = Cart.findOne({ userId }, "date").sort({ orderDate: "desc" }).exec();

    // check if last cart was already ordered
    const cartId = lastCart.cartId;
    const numOrder = Order.find({ cartId }).countDocuments();

    const isCartOrdered = numOrder > 0;
    if (isCartOrdered) {
        // last cart was ordered = no open carts
        return false;
    } else {
        // last cart = open cart, return cartId and cart date.
        return lastCart;
    };
};

function addCartAsync(cart) {
    return cart.save();
};

// function updateCartAsync(cart) {
//     return Cart.updateOne({ _id: cart._id }, cart);
// };

module.exports = {
    getCartByIdAsync,
    getOpenCartByUserAsync,

    addCartAsync,
    // updateCartAsync
};
