const express = require("express");
const itemsLogic = require("../business-logic-layer/items-logic");
const Item = require("../models/item");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

// Get items by cart - GET http://localhost:3000/api/items/totalPrice/:cartId
router.get("/totalPrice/:cartId", async (request, response) => {
    try {
        const totalPrice = await itemsLogic.getItemsTotalPriceAsync(request.params.cartId);
        if(!totalPrice) {
            response.sendStatus(404);
            return;
        };
        response.json(totalPrice);
    }
    catch (err) {
        response.status(500).send(err.message);
    };
});

// Add item - POST http://localhost:3000/api/items
router.post("/", async (request, response) => {
    try {
        const item = new Item(request.body);
        const addedItem = await itemsLogic.addItemAsync(item);
        response.json(addedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Update item - PUT http://localhost:3000/api/items/:_id
router.put("/:_id", async (request, response) => {
    try {
        const item = new Item(request.body);
        item._id = request.params._id;
        const updatedItem = await itemsLogic.updateItemAsync(item);
        if(!updatedItem) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Delete one item - DELETE http://localhost:3000/api/items/:_id
router.delete("/:_id", async (request, response) => {
    try {
        await itemsLogic.deleteItemAsync(request.params._id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Delete all items by cart - DELETE http://localhost:3000/api/items/by-cart/:cartId
router.delete("/by-cart/:cartId", async (request, response) => {
    try {
        await itemsLogic.deleteItemsByCartAsync(request.params.cartId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
