const Order = require("../models/order");

function sumOfOrdersAsync() {
    return Order.count();
};

function getAllOrdersAsync() {
    return Order.find({}).populate(["cart", "user"]).exec();
};

function getOneOrderAsync(_id) {
    return Order.findOne({_id}).populate(["cart", "user"]).exec();
};

function addOrderAsync(order) {
    return order.save();
};

function updateOrderAsync(order) {
    return Order.updateOne({ _id: order._id }, order);
};

function deleteOrderAsync(_id) {
    return Order.deleteOne({_id}).exec();
};

module.exports = {
    sumOfOrdersAsync,
    getAllOrdersAsync,
    getOneOrderAsync,
    addOrderAsync,
    updateOrderAsync,
    deleteOrderAsync
};
