const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

/*
TODO:
@route:
@desc:
@params:
@access:
*/

/*
@route: GET api/profile
@params: have access to req.user cause authenticated
@desc: Gets current users profile, have to be logged in
@access: Private
*/

router.get("/", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const errors = {};
    const {user} = req;

    Profile
        .findOne({user: user.id})
        .then(profile => {

            if (!profile) {
                errors.noprofile = "No profile for this user";

                return res
                    .status(404)
                    .json(errors);
            }

            return res
                .status(200)
                .json(profile);
        })
        .catch(err => res.status(404).json(err))
});

//TODO GET api/profile/test @desc Tests profile route @access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "profile WORKS"
    }

    res.json(testJSON)

})

module.exports = router;