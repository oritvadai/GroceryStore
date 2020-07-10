const Product = require("../models/product");
// const uuid = require("uuid");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

const uploadsFolder = "./uploads"

// Get total number of available products
function getNumProductsAsync() {
    return Product.countDocuments();
}

// function getAllProductsAsync() {
//     return Product.find({}).populate("category").exec();
// }

// Get product by id
function getOneProductAsync(_id) {
    return Product.findOne({ _id }).populate("category").exec();
}

// Get products by category
function getProductsByCategoryAsync(categoryId) {
    return Product.find({ categoryId }).populate("category").exec();
}

// Get products by name
function getProductsByName(productName) {
    return Product.find({ productName }).populate("category").exec();
}

// Add new product
function addProductAsync(product, image) {
    // If there is no uploads folder, create it
    if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
    }
    // Creat new uuid and add the file extension 
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = uuidv4() + extension;
    // Add the new picFileName to the product and save the image with that picFileName
    product.picFileName = fileName;
    image.mv(path.join(uploadsFolder, fileName));

    return product.save();
}

// Update existing Product
async function updateProductAsync(product, image) {
    if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
    }

    if (!image) {
        const oldPic = await Product.findOne({ _id: product._id }, "picFileName").exec();
        product.picFileName = oldPic.picFileName;
    } else {
        // Creat new uuid and add the file extension 
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = uuidv4() + extension;
        // Add the new picFileName to the product and save the image with that picFileName
        product.picFileName = fileName;
        image.mv(path.join(uploadsFolder, fileName));
    }

    const updateResult = await Product.updateOne({ _id: product._id }, product);
    updateResult.picFileName = product.picFileName;

    return updateResult;
}

// Get image
function getImagePathAsync(imgName) {
    return path.join(__dirname, "../uploads", imgName);
}

module.exports = {
    getNumProductsAsync,
    // getAllProductsAsync,
    getOneProductAsync,
    getProductsByCategoryAsync,
    getProductsByName,
    addProductAsync,
    updateProductAsync,
    getImagePathAsync
}
