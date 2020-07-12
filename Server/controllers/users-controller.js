const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const User = require("../models/user");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

// Get user address by id - GET http://localhost:3000/api/users/:_id
router.get("/:_id", async (request, response) => {
    try {
        const userInfo = await usersLogic.getUserInfoAsync(request.params._id);
        if(!userInfo) {
            response.sendStatus(404);
            return;
        }
        response.json(userInfo);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
