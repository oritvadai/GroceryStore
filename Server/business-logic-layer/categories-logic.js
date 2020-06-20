const Category = require("../models/category");

router.use(verifyLoggedIn);

function getAllCategoriesAsync() {
    return Category.find().exec();
};

module.exports = {
    getAllCategoriesAsync,
};
