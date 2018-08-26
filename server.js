const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
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
