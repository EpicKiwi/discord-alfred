const randomElement = require("./randomElement")

module.exports = {
	stringResponseEnd(message) {
		return function(matching,bot){
			matching.reply(message)
			matching.conversation.end()
		}
	},

    oneStringResponseEnd(array) {
        return function(matching,bot){
            matching.reply(randomElement(array))
            matching.conversation.end()
        }
    }
}