const express = require('express');

const router = express.Router();

//TODO GET api/users/test @desc Tests users route @access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "Users WORKS"
    }

    res.json(testJSON)

})

module.exports = router;