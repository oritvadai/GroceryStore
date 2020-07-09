const express = require("express");
const categoriesLogic = require("../business-logic-layer/categories-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

// Get all product categories - GET http://localhost:3000/api/categories
router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
