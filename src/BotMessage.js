module.exports = class BotMessage {
	
	constructor(message){
		this.message = message
		this.module = this.conversation = null
	}

	//DEPRECATED Ne plus utiliser, elle sera supprimée dans une prochain version
	// Utiliser conversation.reply
	reply(rawMessage){
		this.conversation.reply(rawMessage)
	}

    //DEPRECATED Ne plus utiliser, elle sera supprimée dans une prochain version
    // Utiliser conversation.replyFile
	replyFile(file,rawMessage){
		this.conversation.replyFile(file,rawMessage)
	}

}