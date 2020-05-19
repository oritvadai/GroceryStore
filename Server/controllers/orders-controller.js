const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const orders = await ordersLogic.getAllOrdersAsync();
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
