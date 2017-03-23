const randomel = require("./lib/randomElement")
const MatchingCase = require("./MatchingCase")

module.exports = class AlfredModule{

	constructor(){
		this.$startCases = []
		this.$stateCases = []

		this.state([/oublie [çcs]a/i,
					/laisse tomber/i,
					/stop/i,
					/oublions? [çsc]a/i],
					this.$stopConversation)
	}

	init(bot){
		this.bot = bot
	}

	start(regexes,callback){
		this.$startCases.push(this.$createCase(regexes,callback,null))
	}

	state(regexes,callback,test){
		this.$stateCases.push(this.$createCase(regexes,callback,test))
	}

	$getStartCase(matchingMessage){
		for(let i = 0; i<this.$startCases.length; i++){
			let theCase = this.$startCases[i]
			if(theCase.match(matchingMessage)){
				return theCase
			}
		}
		return null
	}

	$getStateCase(matchingMessage){
		for(let i = 0; i<this.$stateCases.length; i++){
			let theCase = this.$stateCases[i]
			if(theCase.match(matchingMessage)){
				if(theCase.test){
					if(theCase.test(matchingMessage.conversation))
						return theCase
				} else {
					return theCase
				}
			}
		}
		return null
	}

	$createCase(regexes,callback,condition){
		return new MatchingCase(regexes,callback,condition)
	}

	$stopConversation(matching,bot){
		matching.reply(randomel([
			"Ok",
			"Très bien",
			"Comme vous voulez..."]))
		matching.conversation.end()
	}
}