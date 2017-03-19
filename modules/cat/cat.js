const request = require("request")

exports.name = "😼 Chats"

exports.regexes = [
    /(montre|affiche|show|donne).+(chat|cat)s?/i,
    /meow/i
]

exports.help = [
	{example: "Affiche un chat"},
    {example: "Meow !" },
	{example: "Show me a cat"},
	{example: "Montre moi un chat", description: "Je vous envoie une image de chat"},
]

exports.onMessage = (message,matching) => {
	request("http://random.cat/meow",(err,response,body) => {
		if(err){
			matching.reply(" Je n'ai pas pu récupèrer l'image de chat :'(")
			return
		}
		var body = JSON.parse(response.body)
		matching.reply(body.file)
	});
}