module.exports = class MatchingMessage {
	
	constructor(evaluatedMessage,originalMessage){
		this.message = originalMessage
		this.evaluatedMessage = evaluatedMessage
		this.module = this.case = this.conversation = null
	}

	reply(rawMessage){
		if(this.conversation.channel.type == "text"){
			rawMessage = this.conversation.user+" "+rawMessage
		}
		this.conversation.channel.send(rawMessage)
	}

}