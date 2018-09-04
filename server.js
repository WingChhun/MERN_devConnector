const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");


//NOTE: Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//* DB Config
const {MONGO_URL, PORT} = require("./config/keys.js");

//* Connect to MongoDB
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB has connected!"))
    .catch(err => console.log("MongoDB failed ", err));

//* Middleware configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {

    res.send("Hello world");

})

//TODO: Passport middleware
app.use(passport.initialize());

require("./config/passport")(passport);

//TODO: ROUTES config
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//! Default route
app.get("*", (req, res) => {
    res.redirect("/");

});

//TODO: Start server on PORT
app.listen(PORT, () => {
    console.log("Server running on PORT", PORT);
})
