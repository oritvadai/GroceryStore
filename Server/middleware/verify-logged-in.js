const jwt = require("jsonwebtoken");

// Verify logged-in through JWT:
function verifyLoggedIn(request, response, next) {

    // If there is no authorization header: 
    if (!request.headers.authorization) { // Headers are automatically lower-cased.
        response.status(401).send("You are not logged-in");
        return;
    }

    // Take the token (header convention: "authorization: Bearer my-token"):
    const token = request.headers.authorization.split(" ")[1];

    // If there is no token: 
    if (!token) {
        response.status(401).send("You are not logged-in");
        return;
    }

    // Verify the token: 
    jwt.verify(token, config.jwt.secretKey, (err, payload) => { // payload is the object used to create the token (i.e. {user}).

        // If the token isn't verified or it is expired:
        if (err) {
            response.status(403).send("Your login session has expired");
            return;
        }

        // Token is verify and not expired: 
        next();
    });
}

module.exports = verifyLoggedIn;
