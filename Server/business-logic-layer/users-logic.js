const User = require("../models/user");

function getOneUserAsync(_id) {
    return User.findOne({_id}).exec();
};

function updateUserAsync(user) {
    return User.updateOne({ _id: user._id }, user);
};

module.exports = {
    getOneUserAsync,
    updateUserAsync
};
