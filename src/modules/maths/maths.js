const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const math = require("mathjs")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "➕" //Un emoji
		this.name = "Calculator"
		this.help = [{example:"Combien font : 3+5/6"},
				{example:"calcule 9+9*18"},
				{example: "Ça fait combien 0+0 ?", description: "Je vous envoie une image de chat"}]

		this.start([/combien font\s?\:?([^ ]*)?\??/i,
		    /resoud ?:? ?([^ ]+)(?: ?\?)?/i,
		    /calcule ?:? ?([^ ]+)(?: ?\?)?/i,
		    /[çc]a fait combien ?:? ?([^ ]+)(?: ?\?)?/i],
			this.compute)
	}

	init(bot){
		super.init(bot)
		console.log("Calculator module initialized")
	}

	compute(matching,bot){
		try {
		        //Consider remaining text as calculation
		        var body = math.eval(matching.case.regexResult[1]);
		        //Prompt Result mentionning the request's author
		        matching.reply(`j'ai calculé \`${matching.case.regexResult[1]} = ${body}\``);
		        if(body == Infinity){
		        	matching.reply("Vous avez surement fait une division par zéro...");
		        }
		    }
		    catch (err) {
		        matching.reply("Désolé, votre équation n'est pas valide.");
			}
		matching.conversation.end()
	}
}