const Item = require("../models/item");

function getAllItemsAsync() {
    return Item.find({}).populate(["product", "cart"]).exec();
};

module.exports = {
    getAllItemsAsync
};
