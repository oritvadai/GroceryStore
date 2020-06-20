const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const Order = require("../models/order");
const verifyLoggedIn = require("../middleware/verify-logged-in")

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

// Get one order - GET http://localhost:3000/api/orders/:_id
// router.get("/:_id", async (request, response) => {
//     try {
//         const order = await ordersLogic.getOneOrderAsync(request.params._id);
//         if(!order) {
//             response.sendStatus(404);
//             return;
//         }
//         response.json(order);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

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

module.exports = router;
