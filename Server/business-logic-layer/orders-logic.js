const Order = require("../models/order");

function getNumOrdersAsync() {
    return Order.countDocuments();
};

function addOrderAsync(order) {
    return order.save();
};

function getLastOrderByUserAsync(userId) {
    const lastOrder = Order.findOne({ userId }, "orderDate").sort({ orderDate: "desc" }).exec();
    return lastOrder;
};

module.exports = {
    getNumOrdersAsync,
    addOrderAsync,
    getLastOrderByUserAsync,
};
