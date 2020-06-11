const crypto = require("crypto");

// Secret phrase to salt:
const secret = config.secrets.salt;

// Hash password:
function hash(password) {

    // Hash with salting: 
    return crypto.createHmac("sha512", secret).update(password).digest("hex");
}

module.exports = {
    hash
}
