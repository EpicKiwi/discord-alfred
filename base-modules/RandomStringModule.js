module.exports = class RandomStringModule{
	constructor(name,regexes,strings) {
		this.name = name
		this.regexes = regexes
		this.strings = strings
	}

	onMessage(message){
		var str = this.strings[Math.round(Math.random()*(this.strings.length-1))]
		message.channel.send(message.author+" "+str)	
	}

}