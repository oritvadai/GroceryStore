const Order = require("../models/order");

function getNumOrdersAsync() {
    return Order.countDocuments();
};

// Get one order
// function getOneOrderAsync(_id) {
//     return Order.findOne({_id}).populate(["cart", "user"]).exec();
// };

function addOrderAsync(order) {
    return order.save();
};

function getLastOrderByUserAsync(userId) {
    const lastOrder = Order.findOne({ userId }, "orderDate").sort({ orderDate: "desc" }).exec();
    return lastOrder;
};

function getOrderByCartAsync(cartId) {
    return Order.find({ cartId }).countDocuments();
}


module.exports = {
    getNumOrdersAsync,
    // getOneOrderAsync,
    addOrderAsync,
    getLastOrderByUserAsync,
    getOrderByCartAsync
};
