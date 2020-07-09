const Item = require("../models/item");

// Get the user's cart items, and calculate total price
async function getItemsTotalPriceAsync(cartId) {
    const items = await Item.find({ cartId }).populate("product").exec();

    const prices = items.map(i => i.itemsPrice);
    const totalPrice = +prices.reduce((a, b) => a + b, 0).toFixed(2);

    return totalPrice;
}

// Add item to cart
function addItemAsync(item) {
    return item.save().then(item => item.populate("product").execPopulate());
}

// Remove item from cart
function deleteItemAsync(_id) {
    return Item.deleteOne({ _id }).exec();
}

// Remove all items from cart
function deleteItemsByCartAsync(cartId) {
    return Item.deleteMany({ cartId }).exec();
}

module.exports = {
    getItemsTotalPriceAsync,
    addItemAsync,
    deleteItemAsync,
    deleteItemsByCartAsync
}
