var responses = [
    "C'est n'est pas correct ",
    "Surveille ton langage gamin ",
    "Ta mère ne serait pas fière ",
    "Fais attention à la manière dont tu me parles, je ne suis pas ton dealer ",
    "Les insultes est le langages des pauvres"]

var badWords = [
    /bite/i,
    /connard/i,
    /enfoir[eé]e?/i,
    /fdp/i,
    /ferme-la( !)?/i,
    /foutre/i,
    /garce/i,
    /gueule/i,
    /merde/i,
    /nique/i,
    /putain/i,
    /pute/i,
    /salope?/i,
]

const RandomStringModule = require("../../base-modules/RandomStringModule")
module.exports = new RandomStringModule("Insultes", badWords, responses)