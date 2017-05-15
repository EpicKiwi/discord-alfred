const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const allocine = require('allocine-api');

module.exports = class ModuleFilms extends AlfredModule {

	constructor(){
		super()
		
		this.icon = "🎥" //Un emoji
		this.name = "Films"
		this.help = [{example:"Quels sont les films disponibles ?"},
				{example:"Il y a quoi au cinema ?"},
				{example: "Que voir ce week end ?", description: "Je vous donne la liste des films les plus populaires a l'affiche"}]

		this.start([
		    /quels?.*films?.*affiche?/i,
		    /quoi.*au.*cin[ée]ma/i],
			this.showFilms)
	}

	init(bot){
		super.init(bot)
		console.log("Films module initialized")
	}

	showFilms(matching,bot){
		allocine.api("movielist",{"filter":"nowshowing","order":"toprank","count":"6"},function(err,result){
			var movies = result.feed.movie
			movies.forEach(function(el){
				console.log(el.title,el.poster.href)
			})
		})
	}
}