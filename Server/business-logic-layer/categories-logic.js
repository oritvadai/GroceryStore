const Category = require("../models/category");

function getAllCategoriesAsync() {
    return Category.find().exec();
}

module.exports = {
    getAllCategoriesAsync,
}
