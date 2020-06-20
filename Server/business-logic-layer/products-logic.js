const Product = require("../models/product");

function getNumProductsAsync() {
    return Product.countDocuments();
};

function getAllProductsAsync() {
    return Product.find({}).populate("category").exec();
};

// function getOneProductAsync(_id) {
//     return Product.findOne({ _id }).populate("category").exec();
// };

function getProductsByCategoryAsync(categoryId) {
    return Product.find({ categoryId }).exec();
};

function getProductsByName(productName) {
    return Product.find({ productName }).populate("category").exec();
};

function addProductAsync(product) {
    return product.save();
};

function updateProductAsync(product) {
    return Product.updateOne({ _id: product._id }, product);
};

module.exports = {
    getNumProductsAsync,
    getAllProductsAsync,
    // getOneProductAsync,
    getProductsByCategoryAsync,
    getProductsByName,
    addProductAsync,
    updateProductAsync
};
