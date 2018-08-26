const express = require('express');

const router = express.Router();

router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "profile WORKS"
    }

    res.json(testJSON)

})

module.exports = router;