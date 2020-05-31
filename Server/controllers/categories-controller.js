const express = require("express");
const categoriesLogic = require("../business-logic-layer/categories-logic");
const router = express.Router();

// Get all categories - GET http://localhost:3000/api/categories
router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get one category - GET http://localhost:3000/api/categories/:_id
// router.get("/:_id", async (request, response) => {
//     try {
//         const category = await categoriesLogic.getOneCategoryAsync(request.params._id);
//         if(!category) {
//             response.sendStatus(404);
//             return;
//         };
//         response.json(category);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     };
// });

module.exports = router;
