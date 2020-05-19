const Cart = require("../models/cart");

function getAllCartsAsync() {
    return Cart.find({}).populate("user").exec();
};

module.exports = {
    getAllCartsAsync
};
