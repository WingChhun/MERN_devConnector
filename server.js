const express = require('express');
const app = express();

const mongoose = require('mongoose');

//DB CONFIG
const db = require("./config/keys.js").MONGO_URL;
const PORT = require("./config/keys.js").PORT;

mongoose
    .connect(db)
    .then(() => console.log("MongoDB has connected!"))
    .catch(err => console.log("MongoDB failed ", err));

//TODO: SETTINGS

//TODO: ROUTES
app.get("/", (req, res) => {

    res.send("Hello world");

})

app.get("*", (req, res) => {
    res.redirect("/");

});

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT);
})
