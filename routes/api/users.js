const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const passport = require("passport");

//* Get User Schema model
const User = require("../../models/User");
const KEYS = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

/*
TODO: Fetch all users
@route GET /api/users/
@params None
@access Public
*/
router.get("/", (req, res) => {

    //*Search User collection return all users

    User
        .find()
        .then(users => {

            return users
                ? res
                    .status(200)
                    .json(users)
                : res
                    .status(400)
                    .json({msg: "No users"});

        })
        .catch(err => console.log(err))

});

/*
@route /api/users/register
@params Username, email, password, password2
@access Public
*/
router.post("/register", (req, res) => {

    //* Check if email exists first
    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    }

    const {email} = req.body;

    //TODO: Search DB if user exists, create if does not exist
    User
        .findOne({email: email})
        .then(user => {

            const {name, email, password} = req.body;
            //! Already exists throw an error
            if (user) {
                return res
                    .status(400)
                    .json({email: "Email already exists!"});

            }
            const avatar = gravatar.url(email, {
                s: '200', //? size
                r: 'pg', //? Rating
                d: 'mm' //? Default
            })
            const newUser = new User({name, email, password});

            //* Brypt hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                    if (err) {
                        throw err;
                    }

                    //! Save User
                    newUser.password = hashedPassword;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            });

        })
        .catch(err => {
            console.log(err);
        })

});

/*
@route POST - /api/users/register
@params Username, email, password, password2
@access Public
*/
router.post("/login", (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //! Return errors for login validation
    if (!isValid) {
        res
            .status(400)
            .json(errors);
    }
    const {email, password} = req.body;

    //? Find user by email
    User
        .findOne({email})
        .then(user => {

            //! No user found, return error 404
            if (!user) {

                errors.email = "User not found";

                return res
                    .status(404)
                    .json(errors)
            }

            //* Check password *compare plain text password and  hhashed password
            const {id, name, avatar} = user;
            const payload = {
                id,
                name,
                avatar
            };

            bcrypt
                .compare(password, user.password)
                .then(isMatch => {

                    if (isMatch) {

                        //* Sign token
                        JWT.sign(payload, KEYS.SECRET, {
                            expiresIn: 3600
                        }, (err, token) => {
                            const BEARER_TOKEN = 'Bearer ' + token;

                            return res.json({success: true, token: BEARER_TOKEN});
                        });
                    } else {

                        errors.password = "Password incorrect";

                        return res
                            .status(400)
                            .json(errors);
                    }
                })

        })
        .catch(err => {
            console.log(err);
        });

});

/*
@route UPDATE /api/users/:id
@params Username, email, password, password2
@access Private
*/
router.post("/:id", (req, res) => {});

/*
@route DELETE /api/users/:id
@params userID
@access Private
*/
router.delete("/:id", (req, res) => {

    User
        .findByIdAndRemove(req.params.id)
        .then((user) => {
            console.log("Succesfully removed ", user)

            return res.json({msg: "Deleted user"})
        })
        .catch(err => {
            console.log(err);
        })

});

/*
@route /api/users/register
@params passport middleware
@access private
*/
router.get("/current", passport.authenticate('jwt', {session: false}), (req, res) => {

    const {id, name, email} = req.user;

    res.json({id, name, email});

});

/*
TODO: GET api/users/test @desc Tests users route
@route /api/users/test
@params nothing
@access Public test
*/
router.get("/test", (req, res) => {

    const testJSON = {
        route: "TEST ROUTE",
        msg: "Users WORKS"
    }

    res.json(testJSON)

})

module.exports = router;