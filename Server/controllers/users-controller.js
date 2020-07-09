const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const User = require("../models/user");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

// Get user by id - GET http://localhost:3000/api/users/:_id
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

// Edit user - PUT http://localhost:3000/api/users/:_id
// router.put("/:_id", async (request, response) => {
//     try {
//         const user = new User(request.body);
//         user._id = request.params._id;
//         const updatedUser = await usersLogic.updateUserAsync(user);
//         if(!updatedUser) {
//             response.sendStatus(404);
//             return;
//         }
//         response.json(updatedUser);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

module.exports = router;
