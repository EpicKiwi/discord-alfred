const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const request = require("request")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "😼" //Un emoji
		this.name = "Chats"
		this.help = [{example:"Affiche un chat"},
				{example:"Meow !"},
				{example: "Montre moi un chat", description: "Je vous envoie une image de chat"}]

		this.start([
		    /(montre|affiche|show|donne).+(chat|cat)s?/i,
		    /meow/i],
			this.showCat)
	}

	init(bot){
		super.init(bot)
		console.log("Cat module initialized")
	}

	showCat(matching,bot){
		var timeout = setTimeout(()=>{
			matching.reply("Veuillez patienter quelques instants...")
		},500)
		matching.conversation.end()
		request("http://random.cat/meow",(err,response,body) => {
			clearTimeout(timeout)
			if(err){
				matching.reply("Je n'ai pas pu récupèrer l'image de chat :'(")
				return
			}
			var body = JSON.parse(response.body)
			matching.replyFile(body.file)
		});
	}
}