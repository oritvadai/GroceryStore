const User = require("../models/user");

function loginAsync(credentials) {
    return User.findOne({username: credentials.username, password: credentials.password}).exec();
};

function registerAsync(user) {
    return user.save();
};

module.exports = {
    loginAsync,
    registerAsync
};
