const jwt = require("jsonwebtoken");

// Verify logged-in through JWT:
function verifyLoggedIn(request, response, next) {

    // If there is no authorization header: 
    if (!request.headers.authorization) { 
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
    jwt.verify(token, config.secrets.jwt, (err, payload) => {

        // If the token isn't verified or it is expired:
        if (err) {
            response.status(403).send("Your login session has expired");
            return;
        }
        request.decodedJwt = payload;

        // Token is verified and not expired: 
        next();
    });
}

module.exports = verifyLoggedIn;
