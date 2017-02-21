const discord = require("discord.js")
const settings = require("./settings")

const bot = new discord.Client();

bot.on('ready',() => {
	console.info("Client ready")
})

bot.on('message',(message) => {
	if(message.channel.name != settings.channel)
		return
	console.log("Message")
	console.log(message)
})

console.info("Logging in to discord...")
bot.login(settings.token)