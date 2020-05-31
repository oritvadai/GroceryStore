const Product = require("../models/product");

function getAllProductsAsync() {
    return Product.find({}).populate("category").exec();
};

function getOneProductAsync(_id) {
    return Product.findOne({_id}).populate("category").exec();
};

function getProductsByCategoryAsync(categoryId) {
    return Product.find({ categoryId }).exec();
}

function addProductAsync(product) {
    return product.save();
};

function updateProductAsync(product) {
    return Product.updateOne({ _id: product._id }, product);
};

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    getProductsByCategoryAsync,
    addProductAsync,
    updateProductAsync
};
