const discord = require("discord.js")
const fs = require("fs")
const natural = require("natural")
const settings = require("./settings")

//The bot used to communicate with discord
const bot = new discord.Client();

//All the modules of the bot associated to their ID (folder name)
var modules = {}

//When the bot is ready
bot.on('ready',() => {
	console.info("Client ready")
})

//When a message is send on the channels
bot.on('message',(message) => {
	//If the channel name match the specified channel in the settings
	//And if the author is not the bot himself
	if(settings.onlyChannel && (message.channel.name != settings.channel  || bot.user.id == message.author.id))
		return
	//Abort if the mention is not present (only when the property is defined in the settings)
	if(settings.onlyMention && !message.mentions.users.get(bot.user.id))
		return
	message.contentWithoutMentions = message.content.replace(/<@.+>/g, '');
	//Test each module grammar for the current message
	var bestMatch = null
	for (var i = 0; i<Object.keys(modules).length; i++) {
		var module = modules[Object.keys(modules)[i]]
		//Check if the module have grammar
		if(!module.grammar)
			continue
		//Check all the grammar lines of the module
		for(var y = 0; y<module.grammar.length; y++){
			var matchingValue = natural.JaroWinklerDistance(message.contentWithoutMentions,module.grammar[y])
			if(bestMatch == null || bestMatch.value < matchingValue){
				bestMatch = {module,value:matchingValue,grammarString:module.grammar[y]}
			}
		}
	}
	console.info(`${message.content} | ${bestMatch.grammarString} => ${bestMatch.module.name} / ${bestMatch.value}`)
	//Abort if the value is under the minimum accuracy and send to the 'notfound' module
	if(bestMatch.value < settings.minAccuracy){
		if(modules.notfound){
			console.info(" -> Using 'notfound' module")
			modules.notfound.onMessage(message)
		} else {
			console.warn(" -> No 'notfound' module tu reply this message")
		}
		return
	}
	bestMatch.module.onMessage(message)
})

//Read the content of the modules folder
var modulesDirs = fs.readdirSync(settings.modulesDir)
for(var i = 0; i < modulesDirs.length; i++){
	var moduleId = modulesDirs[i]
	console.info("Loading module "+moduleId)
	modules[moduleId] = require(settings.modulesDir+"/"+moduleId+"/"+moduleId)
	if(moduleId != "notfound"){
		//Load the grammar.txt file and split each line
		var moduleGrammar = fs.readFileSync(settings.modulesDir+"/"+moduleId+"/grammar.txt","utf8").split(/\r?\n/)
		modules[moduleId].grammar = moduleGrammar
	}
	//Execute the init method of the module if it's exists
	if(modules[moduleId].init)
		modules[moduleId].init()
}

//Starting the bot client
console.info("Logging in to discord...")
bot.login(settings.token)