var responses = [
	"C'est n'est pas correct ",
	"Surveille ton langage gamin ",
	"Ta mère ne serait pas fier ",
	"Les insultes est le langages des pauvres"
]

var badWords = [
	/connard/i,
	/putain/i,
	/ferme-la( !)?/i,
	/pute/i,
	/nique/i,
	/gueule/i,
	/foutre/i,
	/merde/i,
	/enfoir[eé]e?/i

]

const RandomStringModule = require("../../base-modules/RandomStringModule")

module.exports = new RandomStringModule("Insultes",badWords,responses)