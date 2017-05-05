const BotMessage = require("./BotMessage")

module.exports = class AlfredMessage extends BotMessage {
	
	constructor(message){
		super(message)
		this.type = 'alfred'
	}

}