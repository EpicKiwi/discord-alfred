//The name of the module
exports.name = "GoodBye"
//The function called when a message matches the phrases in grammar.txt
exports.onMessage = (message,matching) => {
	//Send a 'hello' message with mention
	matching.reply(`Au revoir ${message.author}`)
}