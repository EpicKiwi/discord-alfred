const fs = require("fs")
const Canvas = require('canvas')
const moment = require("moment")
const path = require("path")
const forecastText = require("./forecastText");

const weathericons = {
	"01d": "sun.png",
	"01n": "sun.png",
	"02d": "cloudy-sun.png",
	"02n": "cloudy-sun.png",
	"03d": "cloud.png",
	"03n": "cloud.png",
	"04d": "cloudy.png",
	"04n": "cloudy.png",
	"09d": "shower.png",
	"09n": "shower.png",
	"10d": "rain.png",
	"10n": "rain.png",
	"11d": "thunderstorm.png",
	"11n": "thunderstorm.png",
	"13d": "snow.png",
	"13n": "snow.png",
	"50d": "fog.png",
	"50n": "fog.png",
}

module.exports = function(owmObject){
	//Création du canvas
	let Image = Canvas.Image
	let canvas = new Canvas(450, 300)
	let ctx = canvas.getContext('2d')
	//Image du soleil
	if(weathericons[owmObject.weather[0].icon]){
		var iconPath = __dirname+"/img/png/"+weathericons[owmObject.weather[0].icon]
		var weatherImg = new Image;
		weatherImg.src = fs.readFileSync(iconPath)
	}
	//Icone de l'umidité
	let humidityImg = new Image;
	humidityImg.src = fs.readFileSync(__dirname+"/img/png/humidity.png")
	//Icone du vent
	let windImg = new Image;
	if(owmObject.wind.deg){
		windImg.src = fs.readFileSync(__dirname+"/img/png/wind.png")
	} else {
		windImg.src = fs.readFileSync(__dirname+"/img/png/wind-icon.png")
	}
	//Image du lever de soleil
	let sunriseImg = new Image;
	sunriseImg.src = fs.readFileSync(__dirname+"/img/png/sunrise.png")
	//Image de coucher de soleil
	let sunsetImg = new Image;
	sunsetImg.src = fs.readFileSync(__dirname+"/img/png/sunset.png")
	//Dessin de l'arrière plan
	ctx.fillStyle = "#36393e"		//Couleur de remplissage
	ctx.fillRect(0,0,450,300)		//Dessin de l'arrière plan
	//Defintion du style de base
	ctx.font = "30pt Verdana"		//Fonte et taille
	ctx.textAlign = "left"			//Alignement
	ctx.textBaseline = "top"		//Emplacement de base
	ctx.fillStyle = "#c3cee0"		//Couleur de police
	//Dessin du nom de la ville
	let titleSize = ctx.measureText(owmObject.name)
	ctx.fillText(owmObject.name,15,15)
	//Dessin du temps
	ctx.font = "15pt Verdana"
	ctx.fillText(moment().format("ddd D MMMM H[h]"),30+titleSize.width,33)
	//Dessin de l'image du temps
	if(weatherImg){
		ctx.drawImage(weatherImg,15,70,125,125)
	}
	//Dessin de la thempérature
	ctx.font = "30pt Verdana"
	let temperature = Math.round((owmObject.main.temp-273.15)*10)/10
	ctx.fillText(temperature+"°C",160,70)
	//Affichage du temps
	ctx.font = "20pt Verdana"
	if(owmObject.weather[0] && owmObject.weather[0].id){
		let weatherText = forecastText.fromId(owmObject.weather[0].id)
		ctx.fillText(weatherText,160,125)
	}
	//Affichage du sous-temps
	ctx.font = "15pt Verdana"
	if(owmObject.weather[1] && owmObject.weather[1].id){
		let weatherText = forecastText.fromId(owmObject.weather[1].id)
		ctx.fillText(weatherText,160,170)
	}
	//Affichage de l'humidité
	ctx.drawImage(humidityImg,15,215,30,30)
	ctx.fillText(owmObject.main.humidity+" %",60,218)
	//Affichage de lever de soleil
	let sunriseDate = moment.unix(owmObject.sys.sunrise)
	ctx.drawImage(sunriseImg,185,215,30,30)
	ctx.fillText(sunriseDate.format("HH:mm"),230,218)
	//Affichage et rotation de l'icone de vent
	ctx.save()
	ctx.translate(30,275)
	if(owmObject.wind.deg)
		ctx.rotate(owmObject.wind.deg*Math.PI/180)
	ctx.drawImage(windImg,-15,-15,30,30)
	ctx.restore()
	let windSpeed = Math.round(owmObject.wind.speed*3.6)
	ctx.fillText(windSpeed+" Km/h",60,263)
	//Affichage du coucher de soleil
	let sunsetDate = moment.unix(owmObject.sys.sunset)
	ctx.drawImage(sunsetImg,185,260,30,30)
	ctx.fillText(sunsetDate.format("HH:mm"),230,263)
	//Renvoie de l'image en buffer
	return canvas.toBuffer()
}

