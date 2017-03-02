const http = require('http')
const request = require('request')

exports.name = "🔮 Wikipedia"

var regexes = [
	/Qu[' ]est[- ]ce qu(?:e|') ?(?:la|le|les|une?|l')? ?(.+)(?: \?)?/i,
	/Qui est (.+)(?: \?)?/i
]

exports.regexes = regexes

exports.help = [
	{example: "Qui est Barrack Obama ?"},
	{example: "Qu'est ce qu'un tabouret ?", description: "Je cherche la signification sur wikipedia"},
]

//Repris et adapté du projet Alfred
exports.onMessage = function(message,matching){
	message.channel.sendMessage(message.author+" Je cherche sur Wikipedia...")
	var wikiSerachOptions = "http://fr.wikipedia.org/w/api.php?action=opensearch&search="+matching.regexResult[1]+"&format=json&utf8"
	request(wikiSerachOptions,(err,res,result) => {
		try{
			result = JSON.parse(result)
			if(result[2].length > 0){
				if(result[2][0] == "" && result[2][1]){
					message.channel.sendMessage(message.author+" "+result[2][1])
				} else if(result[2][0] != "") {
					message.channel.sendMessage(message.author+" "+result[2][0])
				} else {
					message.channel.sendMessage(message.author+" Je ne trouve rien à propos de "+matching.regexResult[1]+". Essayez https://duckduckgo.com/?q="+matching.regexResult[1])
				}
			} else {
				message.channel.sendMessage(message.author+" Je ne trouve rien à propos de "+matching.regexResult[1]+". Essayez https://duckduckgo.com/?q="+matching.regexResult[1])
			}
		} catch(e) {
			console.error(e)
			message.channel.sendMessage(message.author+" Whoops, j'ai une érreur... proposez autre chose peut être...")
		}
	})
}