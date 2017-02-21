exports.name = "Not found"

const messages = [
	"Je n'ai pas compris",
	"Je ne sait que répondre",
	"Je ne peut malheuresement pas vous aider sur ce point là :confused:",
	"Hum hum... je ne sait pas quoi dire",
	"Je suis confu, je ne sait pas quoi répondre",
]

exports.onMessage = (message) => {
	messageNumber = Math.round(Math.random()*(messages.length-1))
	randomMessage = messages[messageNumber]
	console.log("Not found message n°"+messageNumber+" : "+randomMessage)
	message.channel.sendMessage(message.author+", "+randomMessage)
}