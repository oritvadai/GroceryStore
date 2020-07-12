const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const Order = require("../models/order");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// Get the num of all orders - GET http://localhost:3000/api/orders/num
router.get("/num", async (request, response) => {
    try {
        const ordersNum = await ordersLogic.getNumOrdersAsync();
        response.json(ordersNum);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.use(verifyLoggedIn);

// Get last order date by user - GET http://localhost:3000/api/orders/by-user/:userId
router.get("/by-user/:userId", async (request, response) => {
    try {
        const lastOrderDate = await ordersLogic.getLastOrderByUserAsync(request.params.userId);
        if (!lastOrderDate) {
            response.json({ noOrders: true });
            return;
        }
        response.json(lastOrderDate);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add new order - POST http://localhost:3000/api/orders
router.post("/", async (request, response) => {
    try {
        const order = new Order(request.body);

        let err = "";
        if (!order || !order.userId || !order.cartId || !order.city ||
            !order.street || !order.deliveryDate || !order.creditCard) {
            err = "Missing order fields";
        }
        else if (!/^[0-9A-Fa-f]{24}$/.test(order.userId)) {
            err = "Invalid user id";
        }
        else if (!/^[0-9A-Fa-f]{24}$/.test(order.cartId)) {
            err = "Invalid cart id";
        }
        else if (order.city.length < 2 || order.city.length > 50) {
            err = "City should be between 2 - 50 characters";
        }
        else if (order.street.length < 2 || order.street.length > 100) {
            err = "Street should be between 2 - 100 characters";
        }
        else if (!/^([0-9]{8}){1,2}$/.test(order.creditCard)) {
            err = "Invalid credit card number";
        }
        if (err !== "") {
            response.status(400).send(err);
            return;
        }

        const now = new Date();
        order.orderDate = now;

        const addedOrder = await ordersLogic.addOrderAsync(order);
        
        response.json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get receipt after submitting an order
// Get http://localhost:3000/api/orders/receipt/:orderId
router.get("/receipt/:orderId", async (request, response) => {
    try {
        const receipt = await ordersLogic.getOrderReceipt(request.params.orderId);
        response.json({ receipt });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
