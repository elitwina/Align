//finished version of the app.js file
"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 4444;
const route = require("./route");
app.use(express.json());
app.use("/", route);
app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
});