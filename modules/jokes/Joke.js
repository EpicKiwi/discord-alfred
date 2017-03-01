module.exports = class Joke {

	//Construct the joke
	constructor (textOrObject, author) {
		if(typeof textOrObject == 'string' || textOrObject instanceof String){
			//The text of the joke
			this.text = textOrObject
			//The author of the joke "undefine" for anonymous
			this.author = author
		} else {
			//The text of the joke
			this.text = textOrObject.text
			//The author of the joke "undefine" for anonymous
			this.author = textOrObject.author
		}
	}

	//Override the default "toString" function
	toString () {
		var str = this.text
		if(this.author)
			str += `\n\t*Proposée par ${this.author}*`
		return str
	}

	toJSON(){
		return JSON.stringify({text:this.text,author:this.author})
	}
}