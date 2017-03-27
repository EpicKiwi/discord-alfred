const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "👋" //Un emoji
		this.name = "Hello"
		this.help = [{example:"Bonjour",description:"Venez me dire bonjour"},
				{example:"Au revoir",description:"Quand vous partez"},
				{example:"Comment t'améliorer",description:"Je vous donne les instructions pour me custommiser"}]

		this.start([/salut/i,
			/hey/i,
			/hello/i,
			/hi/i,
			/wesh/i,
			/salutations?/i],
			moduleUtils.stringResponseEnd("Bonjour"))

		this.start([/au revoir/i,
			/bye/i,
			/a plus/i,
			/a\+/i],
			moduleUtils.stringResponseEnd("Au revoir"))

		this.start([/comment.+contribuer/i,
			/comment t[' ]am[eé]liorer/i,
			/comment ajouer des fonctionalit[ée]s/i],
			moduleUtils.stringResponseEnd(`Je ne suit qu'un robot! Vous pouvez m'améliorer en Javascript sur GitHub.
Fokez simplement le dépot https://github.com/EpicKiwi/discord-alfred puis faites une pull request.
Toute la documentation est disponible sur le dépot :wink:.`))

		this.start([
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
		],this.badWords)

		this.start([
		    /merci/i,
		],
		moduleUtils.stringResponseEnd(`Ce fut un plaisir :smile:`))
	}

	init(bot){
		super.init(bot)
		console.log("Hello module initialized")
	}

	badWords(matching,bot){
		let responses = [
		    "C'est n'est pas correct ",
		    "Surveille ton langage gamin ",
		    "Ta mère ne serait pas fière ",
		    "Fais attention à la manière dont tu me parles, je ne suis pas ton dealer ",
			"Les insultes est le langages des pauvres"]

		matching.reply(randomElement(responses))
		matching.conversation.end()
	}
}