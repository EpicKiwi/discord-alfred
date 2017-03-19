const http = require('http')
const request = require('request')

exports.name = "🔮 Encyclopédie"

var regexes = [
	/Qu[' ]est[- ]ce qu(?:e|') ?(?:la|le|les|une?|l')? ?([^?]+)(?: ?\?)?/i,
	/Qui est ([^?]+)(?: ?\?)?/i
]

exports.regexes = regexes

exports.help = [
	{example: "Qui est Barrack Obama ?"},
	{example: "Qu'est ce qu'un tabouret ?", description: "Je cherche la signification sur wikipedia et d'autres sites"},
]

//Repris et adapté du projet Alfred
exports.onMessage = function(message,matching){
	message.channel.sendMessage(message.author+" Je cherche...")
	searchOnWikipedia(matching,(result) => {
		if(result)
			message.channel.sendMessage(message.author+" "+result)
		else{
			searchOnDuckduckgo(matching,result => {
				if(result)
					matching.reply(result)
				else
					matching.reply(" Je n'ai rien trouvé d'interessant à propos de "+matching.regexResult[1]+". Essayez https://duckduckgo.com/?q="+matching.regexResult[1].replace(/ /g,"+"))
			})
		}
	})
}

function searchOnWikipedia(matching,callback) {
	var wikiSerachOptions = "http://fr.wikipedia.org/w/api.php?action=opensearch&search="+matching.regexResult[1]+"&format=json&utf8"
	request(wikiSerachOptions,(err,res,result) => {
		try{
			result = JSON.parse(result)
			if(result[2].length > 0){
				if(result[2][0] == "" && result[2][1]){
					callback(result[2][1])
				} else if(result[2][0] != "") {
					callback(result[2][0])
				} else {
					callback()
					return
				}
			} else {
				callback()
			}
		} catch(e) {
			message.channel.sendMessage(message.author+" Whoops, j'ai une érreur... proposez autre chose peut être...")
		}
	})
}

var trustedLiks = [
	/[^.]+\.wikia\.com/i,
	/imdb\.com/i
]

function searchOnDuckduckgo(matching,callback){
	var searchQuery = "https://duckduckgo.com/html?q="+matching.regexResult[1].replace(/ /g,"+")
	request(searchQuery,(err,res,result) => {
		var resultParser = /class="result__snippet" href=".+uddg=([^"]+)/gi
		var regResult = []
		while((regResult = resultParser.exec(result)) != null){
			var link = decodeURIComponent(regResult[1])
			for(var i in trustedLiks){
				if(link.match(trustedLiks[i])){
					callback(link)
					return
				}
			}
		}
		callback()
	})
}