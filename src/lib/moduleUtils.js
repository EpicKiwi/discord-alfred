module.exports = {
	stringResponseEnd(message) {
		return function(matching,bot){
			matching.reply(message)
			matching.conversation.end()
		}
	}
}