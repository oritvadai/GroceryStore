const Item = require("../models/item");

function getItemsByCartAsync(cartId) {
    return Item.find({ cartId }).populate("product").exec();
};

function addItemAsync(item) {
    return item.save().then(item => item.populate("product").execPopulate());
};

function updateItemAsync(item) {
    return Item.updateOne({ _id: item._id }, item);
};

function deleteItemAsync(_id) {
    return Item.deleteOne({ _id }).exec();
};

module.exports = {
    getItemsByCartAsync,
    addItemAsync,
    updateItemAsync,
    deleteItemAsync
};
