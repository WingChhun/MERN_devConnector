const express = require('express');
const app = express();

//TODO: SETTINGS

//TODO: ROUTES

app.get("/", (req, res) => {})

app.get("*", (req, res) => {
    res.redirect("/");

});

app.listen(3000, () => {})
