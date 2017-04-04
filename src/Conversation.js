const AlfredMessage = require("./AlfredMessage")

module.exports = class Conversation {
	
	constructor(mod,user,channel){
		this.module = mod
		this.active = true
		this.user = user
		this.channel = channel
		this.matchings = []
	}

	addMessage(message) {
		this.matchings.push(message)
	}

	end(){
		this.active = false
	}

    reply(rawMessage,callback){
        if(this.channel.type == "text"){
            rawMessage = this.user+" "+rawMessage
        }
        this.channel.send(rawMessage).then(message => {
            let newMessage = new AlfredMessage(message)
            newMessage.conversation = this
            newMessage.module = this.module
            this.addMessage(newMessage)
            this.channel.stopTyping()
            if(callback)
                callback(newMessage)
        })
    }

    replyFile(file,rawMessage,callback){
        if(this.channel.type == "text"){
            if(rawMessage){
                rawMessage = this.user+" "+rawMessage
            } else {
                rawMessage = this.user
            }
        }
        this.channel.sendFile(file,null,rawMessage).then(message => {
            let newMessage = new AlfredMessage(message)
            newMessage.conversation = this
            newMessage.module = this.module
            this.addMessage(newMessage)
            this.channel.stopTyping()
            if(callback)
                callback(newMessage)
        })
    }

}