const fs = require("fs")
const Joke = require("./Joke")

var usersJokesFile = __dirname+"/users-jokes.json"
var alfredJokesFile = __dirname+"/alfred-jokes.json"

exports.name = "😅 Blagues"

var addRegex = /(?:ajoute|apprend?) cette blague ?: ?((?:[\n\r]|.)+)/im

var regexes = [
	addRegex,
	/raconte moi une blague/i,
	/diverti[es]?[- ]moi/i,
	/connais[- ]tu une blague( \?)?/i,
	/fais moi rire( !)?/i,
]

exports.regexes = regexes

var jokes = []

exports.help = [
	{example: "Raconte moi une blague"},
	{example: "Connais-tu une blague ?", description: "Je vous raconte une blague"},
	{example: "Apprend cette blague : [votre blague]", description: "J'ajouterais la blague à mon repertoire"},
]

exports.init = () => {
	//Loading default jokes
	var alfredJokes = JSON.parse(fs.readFileSync(alfredJokesFile,"utf8"))
	for(var jokeindex in alfredJokes){
		jokes.push(new Joke(alfredJokes[jokeindex]))
	}

	var rawUsersJokes = null
	try{
		fs.accessSync(usersJokesFile)
		rawUsersJokes = fs.readFileSync(usersJokesFile,"utf8")
	} catch(e){
		fs.writeFileSync(usersJokesFile,JSON.stringify([]))
		rawUsersJokes = JSON.stringify([])
	}
	var usersJokes = JSON.parse(rawUsersJokes)
	for(var jokeindex in usersJokes){
		jokes.push(new Joke(usersJokes[jokeindex]))
	}
	console.info("Loaded "+jokes.length+" jokes")
}

exports.onMessage = (message,matching) => {
	if(matching.evaluated.match(addRegex)){
		jokes.push(new Joke(matching.regexResult[1],message.author.username))
		message.channel.send("Merci "+message.author+", je l'ai ajoutée à mon repertoire :)")
	} else {
		var joke = jokes[Math.round(Math.random()*(jokes.length-1))]
		message.channel.send(message.author+" "+joke)
	}
}

function saveUsersJokes(){
	var toSaveJokes = []
	for(var jokeIndex in jokes){
		if(jokes[jokeIndex].author){
			toSaveJokes.push(jokes[jokeIndex])
		}
	}
	fs.writeFile(usersJokesFile,JSON.stringify(toSaveJokes),(err) => {
		if(err){
			console.error(err)
			return
		}
		console.info("Jokes saved")
	})
}

//TODO supprimer les blagues du répertoire si elles reçoivent trop de mauvaises notes