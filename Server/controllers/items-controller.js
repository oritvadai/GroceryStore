const express = require("express");
const itemsLogic = require("../business-logic-layer/items-logic");
const Item = require("../models/item");

const router = express.Router();

router.use(verifyLoggedIn);

// Get items by cart - GET http://localhost:3000/api/items/by-cart/:cartId
router.get("/by-cart/:cartId", async (request, response) => {
    try {
        const items = await itemsLogic.getItemsByCartAsync(request.params.cartId);
        if(!items) {
            response.sendStatus(404);
            return;
        };
        response.json(items);
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

// Delete item - DELETE http://localhost:3000/api/items/:_id
router.delete("/:_id", async (request, response) => {
    try {
        await itemsLogic.deleteItemAsync(request.params._id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
