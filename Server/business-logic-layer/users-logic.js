const User = require("../models/user");

// Get user by id
function getOneUserAsync(_id) {
    return User.findOne({_id}).exec();
}

// function updateUserAsync(user) {
//     return User.updateOne({ _id: user._id }, user);
// }

module.exports = {
    getOneUserAsync,
    // updateUserAsync
}
