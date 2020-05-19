const express = require("express");
const categoriesLogic = require("../business-logic-layer/categories-logic");
const router = express.Router();

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
