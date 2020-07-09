const Order = require("../models/order");

function getNumOrdersAsync() {
    return Order.countDocuments();
}

function addOrderAsync(order) {
    return order.save();
}

function getLastOrderByUserAsync(userId) {
    return Order.findOne({ userId }, "orderDate").sort({ orderDate: "desc" }).exec();
}

module.exports = {
    getNumOrdersAsync,
    addOrderAsync,
    getLastOrderByUserAsync,
}
