const express = require('express');

const router = express.Router();


//TODO GET api/profile/test
//@desc Tests profile route
//@access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "profile WORKS"
    }

    res.json(testJSON)

})

module.exports = router;