exports.name = "🚩 Aide"

exports.regexes = [
	/que puis[- ]je dire/i,
	/besoin d[' ]aide/i
]

exports.help = [
	{example: "Que puis-je dire ?"},
	{example: "J'ai besoin d'aide !", description: "Affiche l'aide"},
]

exports.onMessage = (message,matching,bot,modules) => {
	var help = ""
	for(var i in modules){
		var mod = modules[i]
		if(mod.help){
			help += `\n\n**${mod.name}**\n`
			for(var y in mod.help){
				if(mod.help[y].description)
					help += `\n\t\t${mod.help[y].example}\n\t\t\t *${mod.help[y].description}*`
				else
					help += `\n\t\t${mod.help[y].example}`
			}
		}
	}
	matching.reply(`Voici ce sur quoi je peut vous aider :${help}\n`)
}