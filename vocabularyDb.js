"use strict";
let minimongo = require("minimongo");
let db = new minimongo.MemoryDb();
db.addCollection("vocabulary");

function loadVocabulary() {
    let startTime = Date.now();
    let fs = require("fs");
    let vocabularyJsonLD = JSON.parse(fs.readFileSync("CHTN-Core-Vocabulary.1.1.0.jsonld"));
    vocabularyJsonLD["@graph"].forEach((vocabularyEntry) => {
        var compatibleEntries;
        if (typeof vocabularyEntry.compatible.map === "function") {
            compatibleEntries = vocabularyEntry.compatible.map((compatibleEntry) => {
                return compatibleEntry["@id"].slice(5);
            });
        } else {
            compatibleEntries = [vocabularyEntry.compatible["@id"]];
        }
        let entry = {
            _id: vocabularyEntry["@id"].slice(5),
            type: vocabularyEntry["@type"],
            description: vocabularyEntry["description"],
            compatible: compatibleEntries
        }
        db.vocabulary.upsert(entry);
    });
    let endTime = Date.now();
    console.log("Loaded vocabulary in", (endTime - startTime)/1000, "seconds")
}
loadVocabulary();

exports.db = db;
