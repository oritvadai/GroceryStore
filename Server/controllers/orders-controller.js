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
            response.sendStatus(404);
            return;
        }
        response.json(lastOrderDate);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Does an order exist for this cart - GET http://localhost:3000/api/orders//for-cart/:cartId
router.get("/for-cart/:cartId", async (request, response) => {
    try {
        const orderExists = await ordersLogic.orderExistsForCartAsync(request.params.cartId);
        response.json(orderExists>0);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add order - POST http://localhost:3000/api/orders
router.post("/", async (request, response) => {
    try {
        const order = new Order(request.body);
        const now = new Date();
        order.orderDate = now;
        const addedOrder = await ordersLogic.addOrderAsync(order);
        response.json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
