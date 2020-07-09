const Category = require("../models/category");

// Get product categories
function getAllCategoriesAsync() {
    return Category.find().exec();
}

module.exports = {
    getAllCategoriesAsync,
}
