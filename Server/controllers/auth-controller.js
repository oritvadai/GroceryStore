const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login - Post http://localhost:3000/api/auth/login
router.post("/login", async (request, response) => {
    try {
        const user = await authLogic.loginAsync(request.body);
        if (!user) {
            response.status(401).send("Incorrect username or password");
            return;
        }
        console.log(user);
        // Create new Token: 
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        console.log(token);


        // Send back the token to the client: 
        response.json({ user, token });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Register - POST http://localhost:3000/api/auth/register
router.post("/register", async (request, response) => {
    try {
        const user = new User(request.body);
        const newUser = await authLogic.registerAsync(user);

        // Create new Token: 
        const token = jwt.sign({ newUser }, config.jwt.secretKey, { expiresIn: "30m" });

        // Send back the token to the client: 
        response.status(201).json({ newUser, token });
    }
    catch (err) {
        response.status(500).send(err.message);
        console.log(err);
    }
});

module.exports = router;
