"use strict";

let lokijs = require("lokijs");
let express = require("express");
let server = express();

server.get("/", (req, res) => {
    res.send("Vocabulate it up.")
});

server.listen(3000, () => console.log("Vocabulary server listening on port 3000."));
