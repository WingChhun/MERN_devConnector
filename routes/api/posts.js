const express = require('express');

const router = express.Router();




//TODO GET api/posts/test
//@desc Tests posts route
//@access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "posts WORKS"
    }

    res.json(testJSON)

})

module.exports = router;