const BotMessage = require("./BotMessage")

module.exports = class MatchingMessage extends BotMessage {
	
	constructor(evaluatedMessage,originalMessage){
		super(originalMessage)
		this.type = 'matching'
		this.evaluatedMessage = evaluatedMessage
		this.case = null
	}

}