const Cart = require("../models/cart");

function getAllCartsAsync() {
    return Cart.find({}).populate("user").exec();
};

function getOneCartAsync(_id) {
    return Cart.findOne({_id}).populate("user").exec();
};

function addCartAsync(cart) {
    return cart.save();
};

function updateCartAsync(cart) {
    return Cart.updateOne({ _id: cart._id }, cart);
};

function deleteCartAsync(_id) {
    return Cart.deleteOne({_id}).exec();
};

module.exports = {
    getAllCartsAsync,
    getOneCartAsync,
    addCartAsync,
    updateCartAsync,
    deleteCartAsync
};
