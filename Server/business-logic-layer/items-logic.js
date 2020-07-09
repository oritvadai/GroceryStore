const Item = require("../models/item");

async function getItemsTotalPriceAsync(cartId) {

    const items = await Item.find({ cartId }).populate("product").exec();

    const prices = items.map(i => i.itemsPrice);
    const totalPrice = +prices.reduce((a, b) => a + b, 0).toFixed(2);

    return totalPrice;
}

function addItemAsync(item) {
    return item.save().then(item => item.populate("product").execPopulate());
}

function updateItemAsync(item) {
    return Item.updateOne({ _id: item._id }, item);
}

function deleteItemAsync(_id) {
    return Item.deleteOne({ _id }).exec();
}

function deleteItemsByCartAsync(cartId) {
    return Item.deleteMany({ cartId }).exec();
}

module.exports = {
    getItemsTotalPriceAsync,
    addItemAsync,
    updateItemAsync,
    deleteItemAsync,
    deleteItemsByCartAsync
}
