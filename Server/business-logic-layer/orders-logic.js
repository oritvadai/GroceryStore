const Order = require("../models/order");

// Get total number of orders
function getNumOrdersAsync() {
    return Order.countDocuments();
}

// Add new order
function addOrderAsync(order) {
    return order.save();
}

// Get last order by user
function getLastOrderByUserAsync(userId) {
    return Order.findOne({ userId }, "orderDate").sort({ orderDate: "desc" }).exec();
}

module.exports = {
    getNumOrdersAsync,
    addOrderAsync,
    getLastOrderByUserAsync,
}
