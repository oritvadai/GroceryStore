const Cart = require("../models/cart");

function getAllCartsAsync() {
    return Cart.find({}).populate(
        // Check if path "category" is needed
        ["user", { path: "items", populate: { path: "product", populate: "category" } }]
    ).exec();
};

function getOneCartAsync(_id) {
    return Cart.findOne({ _id }).populate(["user", "items"]).exec();
};

function addCartAsync(cart) {
    return cart.save();
};

function updateCartAsync(cart) {
    return Cart.updateOne({ _id: cart._id }, cart);
};

function deleteCartAsync(_id) {
    return Cart.deleteOne({ _id }).exec();
};

module.exports = {
    getAllCartsAsync,
    getOneCartAsync,
    addCartAsync,
    updateCartAsync,
    deleteCartAsync
};
