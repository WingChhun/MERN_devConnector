const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
//* Get User Schema model
const User = require("../../models/User");

//TODO: User CRUD - START

//TODO: READ ALL
router.get("/", (req, res) => {});

//TODO: CREATE @access PUBLIC
router.post("/register", (req, res) => {

    //* Check if email exists first

    const email = req.body.email;

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
            const newUser = new User({name, email,  password});

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