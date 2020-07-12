const Order = require("../models/order");
const cartsLogic = require("./carts-logic");
const usersLogic = require("./users-logic");


// Get total number of orders
function getNumOrdersAsync() {
    return Order.countDocuments();
}

// Add new order
async function addOrderAsync(order) {

    // remove the time of day part of deliveryDate
    const dateString = order.deliveryDate.toISOString().split("T")[0];
    const deliveryDateOnly = new Date(dateString);
    order.deliveryDate = deliveryDateOnly

    // find number of deliveries on this date
    const numOrders = await Order.find({ deliveryDate: order.deliveryDate }, "deliveryDate").countDocuments();

    if (numOrders >= 3) {
        return { dateFullError: true }
    } 

    return order.save();
}

// Get last order by user
function getLastOrderByUserAsync(userId) {
    return Order.findOne({ userId }, "orderDate").sort({ orderDate: "desc" }).exec();
}

// Get receipt after submitting an order
async function getOrderReceipt(_id) {
    const order = await Order.findOne({ _id }).exec();
    const user = await usersLogic.getUserInfoAsync(order.userId);
    const cart = await cartsLogic.getCartByIdAsync(order.cartId);

    const receipt = [];
    receipt.push(`Grocery Store Receipt`);
    receipt.push(`=================================`);
    receipt.push(``);

    receipt.push(`Order Date: ${order.orderDate}`);
    receipt.push(`To: ${user.firstName} ${user.lastName}`);
    receipt.push(`Email: ${user.username}`);
    receipt.push(``);
    receipt.push(`Delivery Address: ${order.street}, ${order.city}`);
    receipt.push(`Delivery Date: ${order.deliveryDate}`);
    receipt.push(`Credit Card: **** **** **** ${order.creditCard}`);
    receipt.push(``);

    receipt.push(`---------------------------------`);
    cart.items.map((item) => receipt.push(
        `${item.product.productName} - ` +
        `${item.quantity} x ` +
        `${item.product.unitPrice.toFixed(2)} per unit = ` +
        `${item.itemsPrice.toFixed(2)} ILS`
    ));

    receipt.push(`=================================`);

    receipt.push(`Total Price: ${cart.totalPrice.toFixed(2)} ILS`);
    receipt.push(`---------------------------------`);

    return receipt.join("\n");
}

module.exports = {
    getNumOrdersAsync,
    addOrderAsync,
    getLastOrderByUserAsync,
    getOrderReceipt
}
