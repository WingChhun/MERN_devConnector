const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//DB CONFIG
const db = require("./config/keys.js").MONGO_URL;
const PORT = require("./config/keys.js").PORT;

//TODO: Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB has connected!"))
    .catch(err => console.log("MongoDB failed ", err));

//TODO: Middleware configuration
app.use(bodyParser.urlencoded({extended: false}));
app.unsubscribe(bodyParser.json());

app.get("/", (req, res) => {

    res.send("Hello world");

})

//TODO: ROUTES config
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("*", (req, res) => {
    res.redirect("/");

});

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT);
})
