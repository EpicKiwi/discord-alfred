const AlfredModule = require("../../AlfredModule")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "👋" //Un emoji
		this.name = "Hello"
		this.help = [{example:"Bonjour",description:"Venez me dire bonjour"}]

		this.start([/salut/i,/hey/i],this.maFonction)
		this.state([/parle moi/],this.luiParler)
		this.state([/chante moi une chanson/],this.luiChanter,conversation=>conversation.chante == true)
	}

	init(bot){
		super.init(bot)
		console.log("Hello module initialized")
	}

	maFonction(matching,bot){
		matching.reply("Salut !")
	}

	luiParler(matching,bot){
		matching.reply("Comment ça va ?")
		matching.conversation.chante = true
	}

	luiChanter(matching,bot){
		matching.reply("...")
		matching.conversation.end()
	}
}