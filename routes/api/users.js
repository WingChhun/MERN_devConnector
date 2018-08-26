const express = require('express');

const router = express.Router();

router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "Users WORKS"
    }

    res.json(testJSON)

})

module.exports = router;