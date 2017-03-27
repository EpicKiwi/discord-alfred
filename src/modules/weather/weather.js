const AlfredModule = require("../../AlfredModule")
const settings = require("../../settings")
const request = require("request")

module.exports = class ModuleHello extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "⛅" //Un emoji
		this.name = "Météo"
		this.help = [{example:"Quel temps fait il a lyon ?"},
		{example:"Quel temps fait il ?",description:"Je vous donne le temps qu'il fait"}]

		this.start([/quel temps fait[- ]il [àa]?u? ?([^?]+) ?\??/i],(matching,bot)=>this.sendWeather(matching,bot))
		this.start([/quel temps fait[- ]il ?\??/i],(matching,bot)=>this.begin(matching,bot))
		this.state([/[àa]?u? ?(.+)/i],(matching,bot)=>this.sendWeather(matching,bot))
	}

	init(bot){
		super.init(bot)
		console.log("Weather module initialized")
	}

	begin(matching,bot){
		matching.reply("Dans quel ville vous trouvez vous ?")
	}

	sendWeather(matching,bot){
		var timeout = setTimeout(()=>{
			matching.reply("Veuillez patienter quelques instants...")
		},500)
		var city = matching.case.regexResult[1]
		this.getWeather(city,(err,result)=>{
			clearTimeout(timeout)
			if(!err){
				if(result.cod == "404"){
					matching.reply(`Je n'ai pas trouvé la ville ${city}`)
				} 
				let temp = Math.round((result.main.temp-273.15)*100)/100
				var replyMess = `A ${result.name}, il y a ${this.getWeatherState(result.weather[0].id)} et il y fait ${temp}°C`
				matching.reply(replyMess)
			}
			matching.conversation.end()
		})
	}

	getWeatherState(code){
		if(code >= 200 && code <= 299){ 
			return "de l'orage"
		} else if(code >= 300 && code <= 399){
			return "une petite bruine"
		} else if(code >= 500 && code <= 599){
			return "de la pluie"
		} else if(code >= 600 && code <= 699){
			return "de la neige"
		} else if(code == 800){
			return "un ciel clair"
		} else if(code >= 801 && code <= 899){
			return "quelques nuages"
		}
	}

	getWeather(city,callback){
		let key = settings.owmApiKey
		let apiUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}`
		request(apiUrl,(error,response,body)=>{
			if(error){
				callback(error)
				return
			}
			try{
				var result = JSON.parse(body)
				callback(undefined,result)
			} catch(e) {
				callback(e)
			}
		})
	}

}