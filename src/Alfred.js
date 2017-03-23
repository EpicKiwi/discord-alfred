const discord = require("discord.js")
const settings = require("./settings")
const EventEmitter = require("events")
const Conversation = require("./Conversation")
const MatchingMessage = require("./MatchingMessage")

module.exports = class Alfred{

	constructor(modules){
		this.modules = modules
		this.conversations = {}
		this.client = new discord.Client()
		this.client.on('ready',()=>{this.onReady()})
		this.client.on('message',message=>{this.onMessage(message)})
	}

	login(){
		this.client.login(settings.token)
	}

	onReady(){
		console.info("Client ready")
		for(let i = 0; i<this.modules.length; i++){
			let thisModule = this.modules[i]
			thisModule.init(this)
			thisModule.bot = this
		}
	}

	onMessage(message){
		//Annule le massage en réponse a alfred lui-meme
		if(message.author.id == this.client.user.id)
			return
		if(settings.onlyMention && message.channel.type == 'text' && !message.mentions.users.get(this.client.user.id))
			return
		//Annule le message depuis un autre channel text que celui qui est défini
		if(settings.onlyChannel && message.channel.type == 'text' && message.channel.name != settings.channel)
			return
		//Annule tout message en provenance d'un autre channel qu'un type dm ou text
		if(message.channel.type != 'text' && message.channel.type != 'dm')
			return
		console.log(`${message.author.username} : ${message.content}`)
		//Formate le message pour l'analyse
		let matchMessage = message.content.replace(this.client.user.toString(),"").trim()
		//Crée un objet de matching avec le message
		var matchingMess = new MatchingMessage(matchMessage,message)
		//Récupère la conversation éventuelle associée a l'utilisateur
		var conversation = this.conversations[message.author.id]
		if( conversation && conversation.active){
			//Ajoute la conversation a l'objet de matching
			matchingMess.conversation = conversation
			let mod = conversation.module
			//Récupère l'éventuel cas de matchng du message
			let theCase = mod.$getStateCase(matchingMess)
			//Dans le cas d'un cas trouvé
			if(theCase){
				this.executeCase(matchingMess,conversation,theCase)
				return
			}
		} else {
			for(let i = 0; i<this.modules.length; i++){
				let mod = this.modules[i]
				//Récupère l'éventuel cas de matchng du message
				let theCase = mod.$getStartCase(matchingMess)
				//Dans le cas d'un cas trouvé
				if(theCase){
					//Crée un conversation
					conversation = new Conversation(mod,message.author,message.channel)
					this.conversations[message.author.id] = conversation
					//Ajoute la conversation a l'objet de matching
					matchingMess.conversation = conversation
					this.executeCase(matchingMess,conversation,theCase)
					return
				}
			}
		}
		//TODO not found sous forme de module
		message.channel.send("Je n'ai pas compris")
	}

	executeCase(matchingMess,conversation,theCase){
		//Ajoute le message a la conversation
		conversation.addMatchingMessage(matchingMess)
		//Ajoute le module au matching
		matchingMess.module = conversation.module
		//Ajoute le cas de matching a l'objet de matching
		matchingMess.case = theCase
		//Execute le cas de matching trouvé
		theCase.exec(matchingMess,this)
	}

}