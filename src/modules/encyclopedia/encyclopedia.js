const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const request = require("request")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "🔮" //Un emoji
		this.name = "Encyclopédie"
		this.help = [{example: "Qui est Barrack Obama ?"},
				{example: "Qu'est ce qu'un tabouret ?", description: "Je cherche la signification sur wikipedia et d'autres sites"}]

		this.start([/Qu[' ]est[- ]ce qu(?:e|') ?(?:la|le|les|une?|l')? ?([^?]+)(?: ?\?)?/i,
			/Qui est ([^?]+)(?: ?\?)?/i],
			(matching,bot)=>this.search(matching,bot))
	}

	init(bot){
		super.init(bot)
		console.log("Encyclopedia module initialized")
	}

	search(matching,bot){
		matching.reply("Je cherche...")
		this.searchOnWikipedia(matching,(result) => {
			if(result)
				matching.reply(result)
			else{
				this.searchOnDuckduckgo(matching,result => {
					if(result)
						matching.reply(result)
					else
						matching.reply("Je n'ai rien trouvé d'interessant à propos de "+matching.case.regexResult[1]+". Essayez https://duckduckgo.com/?q="+matching.regexResult[1].replace(/ /g,"+"))
					matching.conversation.end()
				})
			}
		})
	}

	searchOnWikipedia(matching,callback) {
		var wikiSerachOptions = "http://fr.wikipedia.org/w/api.php?action=opensearch&search="+matching.case.regexResult[1]+"&format=json&utf8"
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
				matching.reply("Whoops, j'ai une érreur... proposez autre chose peut être...")
			}
		})
	}

	searchOnDuckduckgo(matching,callback){
		var trustedLiks = [
			/[^.]+\.wikia\.com/i,
			/imdb\.com/i
		]
		var searchQuery = "https://duckduckgo.com/html?q="+matching.case.regexResult[1].replace(/ /g,"+")
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
}