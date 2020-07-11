const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");

const router = express.Router();

// Login - Post http://localhost:3000/api/auth/login
router.post("/login", async (request, response) => {
    try {
        const credentials = request.body
        if (!credentials || !credentials.username || !credentials.password) {
            response.status(401).send("Missing username and/or password");
            return;
        }

        const user = await authLogic.loginAsync(credentials);
        if (!user) {
            response.status(401).send("Incorrect username or password");
            return;
        }

        // Create new Token: 
        const token = jwt.sign({ user }, config.secrets.jwt, { expiresIn: "30m" });

        // Send back the token to the client: 
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
            response.status(401).send("Missing registration data");
            return;
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
