module.exports = class RandomStringModule{
	constructor(name,regexes,strings) {
		this.name = name
		this.regexes = regexes
		this.strings = strings
	}

	onMessage(message,matching){
		var str = this.strings[Math.round(Math.random()*(this.strings.length-1))]
		matching.reply(str)	
	}

}