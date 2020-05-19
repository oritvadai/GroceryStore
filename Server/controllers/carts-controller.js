const express = require("express");
const cartsLogic = require("../business-logic-layer/carts-logic");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const carts = await cartsLogic.getAllCartsAsync();
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
