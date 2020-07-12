const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");

const router = express.Router();

// Username = email validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Login - Post http://localhost:3000/api/auth/login
router.post("/login", async (request, response) => {
    try {
        const credentials = request.body
        if (!credentials || !credentials.username || !credentials.password) {
            response.status(400).send("Missing username and/or password");
            return;
        }

        let err = "";
        if (!validateEmail(newUser.username)) {
            err = "Invalid email address";
        }
        else if (credentials.password.length() < 6 || credentials.password.length() > 50) {
            err = "Password should be between 6 - 50 characters";
        }
        if (err !== "") {
            response.status(400).send(err);
        }

        const user = await authLogic.loginAsync(credentials);
        if (!user) {
            response.status(401).send("Incorrect username or password");
            return;
        }

        // Create new token and send to the client
        const token = jwt.sign({ user }, config.secrets.jwt, { expiresIn: "30m" });
        response.json({ user, token });

    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Check if User ID Exists - GET http://localhost:3000/api/auth/:ID
router.get("/:ID", async (request, response) => {
    try {
        const userIDExists = await authLogic.userIDExistsAsync(request.params.ID);
        response.json(userIDExists);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Register new user - POST http://localhost:3000/api/auth/register
router.post("/register", async (request, response) => {
    try {
        // Verify captcha text: 
        // if (request.body.captchaText !== request.session.captchaText) {
        //     response.status(400).send("CAPTCHA not valid");
        //     return;
        // }

        const newUser = new User(request.body);
        if (!newUser || !newUser.firstName || !newUser.lastName || !newUser.username
            || !newUser.ID || !newUser.password || !newUser.city || !newUser.street) {
            response.status(400).send("Missing registration data");
            return;
        }

        let err = "";
        if (newUser.firstName.length() < 2 || newUser.firstName.length() > 50) {
            err = "First name should be between 2 - 50 characters";
        }
        else if (newUser.lastName.length() < 2 || newUser.lastName.length() > 50) {
            err = "Last name should be between 2 - 50 characters";
        }
        else if (newUser.password.length() < 6 || newUser.password.length() > 50) {
            err = "Password should be between 6 - 50 characters";
        }
        else if (newUser.city.length() < 2 || newUser.city.length() > 50) {
            err = "City should be between 2 - 50 characters";
        }
        else if (newUser.street.length() < 2 || newUser.street.length() > 100) {
            err = "Street should be between 2 - 100 characters";
        }
        else if (/^\d{9}$/.test(id)) {
            err = "ID must be exactly 9 digits";
        }
        else if (!validateEmail(newUser.username)) {
            err = "Invalid email address";
        }
        if (err !== "") {
            response.status(400).send(err);
        }

        newUser.role = "user";
        const user = await authLogic.registerAsync(newUser);

        // Create new Token: 
        const token = jwt.sign({ user }, config.secrets.jwt, { expiresIn: "30m" });

        // Send back the token to the client: 
        response.status(201).json({ user, token });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Request captcha image - Get http://localhost:3000/api/auth/captcha
// router.get("/captcha", (request, response) => {

//     // Create a new captcha: 
//     const captcha = svgCaptcha.create();
//     const captchaText = captcha.text;
//     const captchaImage = captcha.data;

//     // Save text to session: 
//     request.session.captchaText = captchaText;

//     // Send back the image to client: 
//     response.type("svg").send(captchaImage);
// });

module.exports = router;
