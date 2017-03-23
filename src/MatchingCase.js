module.exports = class MatchingCase{
	constructor(regexes,callback,test){
		this.regexes = regexes
		this.callback = callback
		this.test = test
		this.regex = this.regexResult = this.evaluatedMessage = null
	}

	match(matchingMessage){
		this.evaluatedMessage = matchingMessage.evaluatedMessage
		for(let i = 0; i<this.regexes.length; i++){
			let regex = this.regexes[i]
			var regResult = regex.exec(matchingMessage.evaluatedMessage)
			if(regResult){
				this.regex = regex
				this.regexResult = regResult
				return regResult
			}
		}
		return null
	}

	exec(matching,bot){
		this.callback(matching,bot)
	}
}