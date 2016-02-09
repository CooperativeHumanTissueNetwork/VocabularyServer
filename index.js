"use strict";

let express = require("express");
let server = express();

let db = require("./vocabularyDb").db;

server.get("/", (req, res) => {
    let entityCount = db.vocabulary.count();
    res.send("Vocabulate it up. Now serving "+entityCount+" entities.");
});

server.get("/compatibleWith", (req, res) => {
    let query = { compatible: { $all: JSON.parse(req.query.compatible) }};
    if (req.query.type) query.type = req.query.type;
    console.log(JSON.stringify(query, 2));
    db.vocabulary.find(query).fetch((results) => {
        res.send(results);
    });
});

server.listen(3000, () => console.log("Vocabulary server listening on port 3000."));
