const StringModule = require("../../base-modules/StringModule")

var regexes = [
	/comment.+contribuer/i,
	/comment t[' ]am[eé]liorer/i,
	/comment ajouer des fonctionalit[ée]s/i
]

var message = `En effet, je ne suit qu'un robot. Vous pouvez m'améliorer en Javascript sur GitHub.
Fokez simplement le dépot https://github.com/EpicKiwi/discord-alfred puis faites une pull request. Toute la documentation est disponible sur le dépot :wink:.`

var mod = new StringModule("💾 Contribuer",regexes,message)

mod.help = [
	{example: "Comment t'améliorer ?"},
	{example: "Comment contribuer ?", description:"Afficher la procédure pour me customiser"}
]

module.exports = mod