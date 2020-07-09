const User = require("../models/user");
const cryptography = require("../helpers/cryptography");

// Login with credentials
function loginAsync(credentials) {
    credentials.password = cryptography.hash(credentials.password);
    return User.findOne({ username: credentials.username, password: credentials.password }, { firstName: 1, lastName: 1, role: 1 }).exec();
}

// Check that the user ID isn't in the db
function userIDExistsAsync(ID) {
    return User.exists({ID});
}

// Register new user
function registerAsync(newUser) {
    newUser.password = cryptography.hash(newUser.password);
    newUser.save();
    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.role = newUser.role;
    return user;
}

module.exports = {
    loginAsync,
    userIDExistsAsync,
    registerAsync
}
