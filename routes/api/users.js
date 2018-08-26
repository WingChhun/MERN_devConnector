const express = require('express');

const router = express.Router();

//* Get User Schema model
const User = require("../../models/User");

//TODO: User CRUD - START

//TODO: READ ALL
router.get("/", (req, res) => {});

//TODO: CREATE
router.post("/", (req, res) => {});

//TODO: UPDATE
router.post("/:id", (req, res) => {});

//TODO: DELETE
router.delete("/:id", (req, res) => {});

//TODO GET api/users/test @desc Tests users route @access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "Users WORKS"
    }

    res.json(testJSON)

})

module.exports = router;