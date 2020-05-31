const Category = require("../models/category");

function getAllCategoriesAsync() {
    return Category.find().exec();
};

// function getOneCategoryAsync(_id) {
//     return Category.findOne({_id}).populate("products").exec();
// };

module.exports = {
    getAllCategoriesAsync,
    // getOneCategoryAsync
};
