const User = require("../models/user");

// Get user address by id
async function getUserInfoAsync(_id) {
    const result = await User.findOne({ _id }).exec();
    const userInfo = new User();

    userInfo.firstName = result.firstName;
    userInfo.lastName = result.lastName;
    userInfo.username = result.username;
    userInfo.city = result.city;
    userInfo.street = result.street;
    
    return userInfo;
}


module.exports = {
    getUserInfoAsync
}
