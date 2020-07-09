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

// Get product image - GET http://localhost:3000/api/products/uploads/:imgName
router.get("/uploads/:imgName", async (request, response) => {
    try {
        const imgName = request.params.imgName;
        const imgPath = await productsLogic.getImagePathAsync(imgName);
        response.sendFile(imgPath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.use(verifyLoggedIn);

// Get all products - GET http://localhost:3000/api/products
router.get("/", async (request, response) => {
    try {
        // Allow access only to admin
        const user = request.decodedJwt.user;
        if (user.role != "admin") {
            response.status(403).send("Access denied");
            return;
        }
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
        if (!product) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get products by category - GET http://localhost:3000/api/products/by-category/:categoryId
router.get("/by-category/:categoryId", async (request, response) => {
    try {
        const products = await productsLogic.getProductsByCategoryAsync(request.params.categoryId);
        if (!products) {
            response.sendStatus(404);
            return;
        }
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get products by name - GET http://localhost:3000/api/products/by-name/:productName
router.get("/by-name/:productName", async (request, response) => {
    try {
        const product = await productsLogic.getProductsByName(request.params.productName);
        if (!product) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add product - POST http://localhost:3000/api/products
router.post("/", async (request, response) => {
    try {
        // Allow access only to admin
        const user = request.decodedJwt.user;
        if (user.role != "admin") {
            response.status(403).send("Access Denied");
            return;
        }
        if (!request.files) {
            response.status(400).send("No File Sent");
            return;
        }

        const image = request.files.image;
        const product = new Product(request.body);

        if (!product || !product.productName || !product.categoryId || !product.unitPrice) {
            response.status(400).send("Missing Product Details");
            return;
        }
        const addedProduct = await productsLogic.addProductAsync(product, image);
        response.json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Update product - PUT http://localhost:3000/api/products/:_id
router.put("/:_id", async (request, response) => {
    try {
        // Allow access only to admin
        const user = request.decodedJwt.user;
        if (user.role != "admin") {
            response.status(403).send("Access Denied");
            return;
        }

        const image = (request.files) ? request.files.image : null;
        const product = new Product(request.body);
        const id = request.params._id;
        product._id = id;

        if (!product || !product.productName || !product.categoryId || !product.unitPrice) {
            response.status(400).send("Missing Product Details");
            return;
        }
        const updatedProduct = await productsLogic.updateProductAsync(product, image);
        if (!updatedProduct) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
