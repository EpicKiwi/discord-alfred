module.exports = class Conversation {
	
	constructor(mod,user,channel){
		this.module = mod
		this.active = true
		this.user = user
		this.channel = channel
		this.matchings = []
	}

	addMatchingMessage(matching) {
		this.matchings.push(matching)
	}

	end(){
		this.active = false
	}

}