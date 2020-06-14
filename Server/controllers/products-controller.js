const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const Product = require("../models/product");
const verifyLoggedIn = require("../middleware/verify-logged-in")

const router = express.Router();

// Get the num of all products - GET http://localhost:3000/api/products/num
router.get("/num", async (request, response) => {
    try {
        const productsNum = await productsLogic.getNumProductsAsync();
        response.json(productsNum);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Invoke this middleware for any products route:
router.use(verifyLoggedIn);

// Get all products - GET http://localhost:3000/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get one product - GET http://localhost:3000/api/products/:_id
router.get("/:_id", async (request, response) => {
    try {
        const product = await productsLogic.getOneProductAsync(request.params._id);
        if(!product) {
            response.sendStatus(404);
            return;
        };
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    };
});

// Get products by category - GET http://localhost:3000/api/products/by-category/:categoryId
router.get("/by-category/:categoryId", async (request, response) => {
    try {
        const products = await productsLogic.getProductsByCategoryAsync(request.params.categoryId);
        if(!products) {
            response.sendStatus(404);
            return;
        };
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    };
});

// Add product - POST http://localhost:3000/api/products
router.post("/", async (request, response) => {
    try {
        const product = new Product(request.body);
        const addedProduct = await productsLogic.addProductAsync(product);
        response.json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    };
});

// Update product - PUT http://localhost:3000/api/products/:_id
router.put("/:_id", async (request, response) => {
    try {
        const product = new Product(request.body);
        product._id = request.params._id;
        const updatedProduct = await productsLogic.updateProductAsync(product);
        if(!updatedProduct) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    };
});

module.exports = router;
