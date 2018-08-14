const mana = require("../utils/mana");
const all = require("../__mocks__/input");
const fs = require("fs");
const rawEntities = require("../__mocks__/map").rawEntities;

let answer =  mana.identifyObject(all.availabilities["38644"].answers["84684"])

// console.log('answer', answer);

answer = mana.identifyObject(all.availabilities["38644"].eventLocation)

// console.log('answer', answer);

answer = mana.identifyObject(all.events["28626"]);

// console.log('answer', answer);

answer = mana.identifyObject(mana.trimObject(rawEntities.eventItem, all.availabilities["38644"]));

// console.log('answer', answer);

answer = mana.mergeSimilarEntities(mana.findAllEntities(all));
// console.log('answer', answer);


answer = mana.findAllEntities(all);
// console.log('answer', answer);

answer = mana.findFixedEntities(all);
console.log('answer', answer);

fs.writeFileSync("test.json", JSON.stringify(answer, null, 4));