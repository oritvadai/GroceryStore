const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const User = require("../models/user");

const router = express.Router();

// Get all users - GET http://localhost:3000/api/users
router.get("/", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Get one user - GET http://localhost:3000/api/users/:_id
router.get("/:_id", async (request, response) => {
    try {
        const user = await usersLogic.getOneUserAsync(request.params._id);
        if(!user) {
            response.sendStatus(404);
            return;
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Login user - Post http://localhost:3000/api/users
// How to request data from body and not ip?
router.post("/login", async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;
        const user = await usersLogic.loginUserAsync(username, password);
        if(!user) {
            response.status(403).send("Incorrect username or password");
            return;
            // response.sendStatus(404);
            // return;
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add user - POST http://localhost:3000/api/users
router.post("/", async (request, response) => {
    try {
        const user = new User(request.body);
        const addedUser = await usersLogic.addUserAsync(user);
        response.json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Edit user - PUT http://localhost:3000/api/users/:_id
router.put("/:_id", async (request, response) => {
    try {
        const user = new User(request.body);
        user._id = request.params._id;
        const updatedUser = await usersLogic.updateUserAsync(user);
        if(!updatedUser) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
