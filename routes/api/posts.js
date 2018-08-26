const express = require('express');

const router = express.Router();

router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "posts WORKS"
    }

    res.json(testJSON)

})

module.exports = router;