const Order = require("../models/order");

function getNumOrdersAsync() {
    return Order.countDocuments();
};

router.use(verifyLoggedIn);

// Get one order
// function getOneOrderAsync(_id) {
//     return Order.findOne({_id}).populate(["cart", "user"]).exec();
// };

function addOrderAsync(order) {
    return order.save();
};

module.exports = {
    getNumOrdersAsync,
    // getOneOrderAsync,
    addOrderAsync,
};
