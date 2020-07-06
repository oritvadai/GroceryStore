const Cart = require("../models/cart");
const Order = require("../models/order");

// Get cart by _id
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

// Add cart
function addCartAsync(cart) {
    return cart.save();
};

// ---------------------------------------------------------------------

// get the last cart of the user
function getLastCartAsync(userId) {
    return Cart.findOne({ userId }, "date").sort({ orderDate: "desc" }).exec();
}

// check if last cart was already ordered
function isCartOrderedAsync(cartId) {
    return Order.find({ cartId }).countDocuments();
};

// Check if user has cart or not, and if it was ordered or left open
async function getOpenCartByUser(userId) {
    // get the last cart of the user
    const lastCart = await getLastCartAsync(userId);
    if (!lastCart) {
        // no carts
        return { hasCarts: false, hasOpenCart: false };
    };

    const cartId = lastCart._id;
    // check if last cart was already ordered
    const isCartOrdered = await isCartOrderedAsync(cartId);
    if (isCartOrdered) {
        // no open cart        
        return { hasCarts: true, hasOpenCart: false };
    };

    // open cart
    const openCart = {
        _id: lastCart._id,
        date: lastCart.date,
        hasCarts: true,
        hasOpenCart: true
    }
    return openCart;
};


module.exports = {
    getCartByIdAsync,
    addCartAsync,
    getOpenCartByUser
};
