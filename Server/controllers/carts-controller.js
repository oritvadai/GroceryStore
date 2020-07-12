const express = require("express");
const cartsLogic = require("../business-logic-layer/carts-logic");
const Cart = require("../models/cart");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

// Get cart by id + items & total price - 
// GET http://localhost:3000/api/carts/:_id
router.get("/:_id", async (request, response) => {
    try {
        const cart = await cartsLogic.getCartByIdAsync(request.params._id);
        if(!cart) {
            response.sendStatus(404);
            return;
        }
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get open cart (id & date) by user -
// GET http://localhost:3000/api/carts/date/:userId
router.get("/date/:userId", async (request, response) => {
    try {
        const openCart = await cartsLogic.getOpenCartByUser(request.params.userId);
        if(!openCart) {
            response.sendStatus(404);
            return;
        }
        response.json(openCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add new cart - POST http://localhost:3000/api/carts
router.post("/", async (request, response) => {
    try {
        const cart = new Cart(request.body);
        const addedCart = await cartsLogic.addCartAsync(cart);
        response.json(addedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;