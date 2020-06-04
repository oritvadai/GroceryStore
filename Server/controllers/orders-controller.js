const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const Order = require("../models/order");
const verifyLoggedIn = require("../middleware/verify-logged-in")

const router = express.Router();

// Get SUM of all orders - GET http://localhost:3000/api/orders/sum
router.get("/sum", async (request, response) => {
    try {
        const ordersSum = await ordersLogic.sumOfOrdersAsync();
        response.json(ordersSum);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Invoke this middleware for any products route:
router.use(verifyLoggedIn);

// Get all orders - GET http://localhost:3000/api/orders
router.get("/", async (request, response) => {
    try {
        const orders = await ordersLogic.getAllOrdersAsync();
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get one order - GET http://localhost:3000/api/orders/:_id
router.get("/:_id", async (request, response) => {
    try {
        const order = await ordersLogic.getOneOrderAsync(request.params._id);
        if(!order) {
            response.sendStatus(404);
            return;
        }
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add order - POST http://localhost:3000/api/orders
router.post("/", async (request, response) => {
    try {
        const order = new Order(request.body);
        const addedOrder = await ordersLogic.addOrderAsync(order);
        response.json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Edit order - PUT http://localhost:3000/api/orders/:_id
router.put("/:_id", async (request, response) => {
    try {
        const order = new Order(request.body);
        order._id = request.params._id;
        const updatedOrder = await ordersLogic.updateOrderAsync(order);
        if(!updatedOrder) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Delete order - DELETE http://localhost:3000/api/orders/:_id
router.delete("/:_id", async (request, response) => {
    try {
        await ordersLogic.deleteOrderAsync(request.params._id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;
