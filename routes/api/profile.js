const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfile = require("../../validation/profile");
/*
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
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const {user} = req;

    //! populate will populate User field into response
    Profile
        .findOne({user: user.id})
        .populate('user', ["name", "avatar"])
        .then(profile => {
            console.log('profile', profile);

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

/*
@route: POST api/profile
@desc: Create or Edit user profile
@params: passport.jwt for access to req.user
@access: Private
*/
router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {

    //! Validate and return errors if exists @NOTE: Get fields
    const {user} = req;
    const profileFields = {};
    const {errors, isValid} = validateProfile(req.body);

    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    }

    profileFields.user = req.user.id;
    profileFields.social = {};

    //! Check if hnadle is actually sent in
    if (req.body.handle) {
        profileFields.handle = req.body.handle;
    }

    if (req.body.company) {
        profileFields.company = req.body.company;
    }

    if (req.body.website) {
        profileFields.website = req.body.website;
    }

    if (req.body.location) {
        profileFields.location = req.body.location;
    }

    if (req.body.desc) {
        profileFields.desc = req.body.desc;
    }

    if (req.body.status) {
        profileFields.status = req.body.status;
    }

    if (req.body.githubUsername) {
        profileFields.githubUsername = req.body.githubUsername;
    }

    if (typeof req.body.skills !== 'undefined') {

        //Note: logic to trim white space and make array of CSVS
        // * Array of comma splitted values (csvs)

        let skills = req
            .body
            .skills
            .split(',');

        skills = skills.map(skill => skill.trim());

        profileFields.skills = skills;

    }

    if (req.body.youtube) {
        profileFields.social.youtube = req.body.youtube;
    }

    if (req.body.twitter) {
        profileFields.social.twitter = req.body.twitter;
    }

    if (req.body.facebook) {
        profileFields.social.facebook = req.body.facebook;
    }

    if (req.body.linkedin) {
        profileFields.social.linkedin = req.body.linkedin;
    }

    if (req.body.instagram) {
        profileFields.social.instagram = req.body.instagram;
    }

    //*Logic

    Profile
        .findOne({user: req.user.id})
        .then(profile => {

            //!Update rather than create
            if (profile) {

                //NOTE: $set is unique to findOenAndUpdate as a new
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {new: true})
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err))

            } else {

                //!Check if handle exists
                Profile
                    .findOne({handle: profileFields.handle})
                    .then(profile => {

                        if (profile) {
                            errors.handle = "That handle already exists";

                            //!Error 400 is a validation error status code
                            return res
                                .status(400)
                                .json(errors);

                        }

                        //* Create and save profile

                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))

                    })
            }
        })

});

/*
@route: POST api/profile
@desc: Create or Edit user profile
@params: passport.jwt for access to req.user
@access: Private
*/

//TODO GET api/profile/test @desc Tests profile route @access Public
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "profile WORKS"
    }

    res.json(testJSON)

})

module.exports = router;