const Product = require("../models/product");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const uploadsFolder = "./uploads"

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

function addProductAsync(product
    // , image
    ) {
    // If there is no uploads folder, create it
    if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
    }
    // Creat new uuid and add the file extension 
    // const extension = image.name.substr(image.name.lastIndexOf("."));
    // const fileName = uuid() + extension;
    // Add the new picFileName to the product and save the image with that picFileName
    // product.picFileName = fileName;
    // image.mv(path.join(uploadsFolder , fileName));

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
