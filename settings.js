module.exports = {
	token: process.argv[2],	//The bot token registered, this token is given in argument
	onlyChannel: true, //Jail the bot in a specific channel
	channel: "ask-alfred", //The channel where the message of the bot will be sent
	modulesDir: "./modules", //The folder where the modules are located
	minAccuracy: 0.7, //The minimum accuracy required to send to a module
	onlyMention: true, //Accept only messages with explicit mention to the bot
}