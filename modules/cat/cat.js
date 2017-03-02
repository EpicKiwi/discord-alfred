const request = require("request")

exports.name = "Chats"

exports.regexes = [
	/(montre|affiche|show|donne).+(chat|cat)s?/i
]

exports.help = [
	{example: "Affiche un chat"},
	{example: "Show me a cat"},
	{example: "Montre moi un chat", description: "Affiche une image de chat"},
]

exports.onMessage = (message) => {
	request("http://random.cat/meow",(err,response,body) => {
		if(err){
			message.channel.sendMessage(message.author+" Je n'ai pas pu récupèrer l'image de chat :(")
			return
		}
		var body = JSON.parse(response.body)
		message.channel.sendMessage(message.author+" "+body.file)
	});
}