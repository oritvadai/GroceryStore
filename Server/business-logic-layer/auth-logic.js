const User = require("../models/user");
const cryptography = require("../helpers/cryptography");

function loginAsync(credentials) {
    credentials.password = cryptography.hash(credentials.password);
    return User.findOne({ username: credentials.username, password: credentials.password }, { firstName: 1, lastName: 1, role: 1 }).exec();
};

function userIDExistsAsync(ID) {
    return User.exists({ID});
};

function registerAsync(newUser) {
    newUser.password = cryptography.hash(newUser.password);
    newUser.save();
    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.role = newUser.role;
    return user;
};

module.exports = {
    loginAsync,
    userIDExistsAsync,
    registerAsync
};
