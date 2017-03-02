//The name of the module
exports.name = "Hello"
//The function called when a message matches the phrases in grammar.txt
exports.onMessage = (message) => {
	//Send a 'hello' message with mention
	message.channel.send(`Bonjour ${message.author}`)
}