const User = require("../models/user");

function loginAsync(credentials) {
    return User.findOne({ username: credentials.username, password: credentials.password }, { firstName: 1, lastName: 1 }).exec();
};

function registerAsync(newUser) {
    newUser.save();
    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    return user;
};

module.exports = {
    loginAsync,
    registerAsync
};
