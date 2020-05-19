const Order = require("../models/order");

function getAllOrdersAsync() {
    return Order.find({}).populate(["cart", "user"]).exec();
};

module.exports = {
    getAllOrdersAsync
};
