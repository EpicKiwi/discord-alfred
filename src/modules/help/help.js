const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const request = require("request")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "🚩" //Un emoji
		this.name = "Aide"
		this.help = [{example:"Aide moi"},
				{example: "Que puis-je dire ?"},
				{example: "J'ai besoin d'aide !", description: "Tout ce que vous pouvez me demander"}]

		this.start([
			/que puis[- ]je dire/i,
			/besoin d[' ]aide/i,
			/aide[- ]moi/i],
			this.showHelp)
	}

	init(bot){
		super.init(bot)
		console.log("Help module initialized")
	}

	showHelp(matching,bot){
		var help = ""
		for(var i in bot.modules){
			var mod = bot.modules[i]
			if(mod.help){
				help += `\n\n${mod.icon} **${mod.name}**\n`
				for(var y in mod.help){
					if(mod.help[y].description)
						help += `\n\t\t${mod.help[y].example}\n\t\t\t *${mod.help[y].description}*`
					else
						help += `\n\t\t${mod.help[y].example}`
				}
			}
		}
        help += `\n\n⛔ **Quitter**\n`
        help += `\n\t\tOublie ça`
        help += `\n\t\tLaisse tomber\n\t\t\t *Quitter une conversation*`
		matching.reply(`En quoi puis-je vous aider ?${help}\n`)
		matching.conversation.end()
	}
}