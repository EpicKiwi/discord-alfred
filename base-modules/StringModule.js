module.exports = class StringModule{
	constructor(name,regexes,string) {
		this.name = name
		this.regexes = regexes
		this.string = string
	}

	onMessage(message,matching){
		matching.reply(this.string)	
	}

}