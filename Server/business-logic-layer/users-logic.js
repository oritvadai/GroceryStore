const User = require("../models/user");

// Get user address by id
async function getUserInfoAsync(_id) {
    const result = await User.findOne({ _id }).exec();
    const userInfo = new User();
    userInfo.city = result.city;
    userInfo.street = result.street;
    return userInfo;
}

// function updateUserAsync(user) {
//     return User.updateOne({ _id: user._id }, user);
// }

module.exports = {
    getUserInfoAsync,
    // updateUserAsync
}
