const Item = require("../models/item");

function getAllItemsAsync() {
    return Item.find({}).populate(["product", "cart"]).exec();
};

function getOneItemAsync(_id) {
    return Item.findOne({_id}).populate(["product", "cart"]).exec();
};

// Get items by cardId / userId ?
function getItemsByCartAsync(cartId) {
    return Item.find({ cartId }).populate("product").exec();
};

function addItemAsync(item) {
    return item.save();
};

function updateItemAsync(item) {
    return Item.updateOne({ _id: item._id }, item);
};

function deleteItemAsync(_id) {
    return Item.deleteOne({_id}).exec();
};

module.exports = {
    getAllItemsAsync,
    getOneItemAsync,
    getItemsByCartAsync,
    addItemAsync,
    updateItemAsync,
    deleteItemAsync
};
