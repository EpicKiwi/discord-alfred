const settings = require("./settings")
const moduleLoader = require("./moduleLoader")
const Alfred = require("./Alfred")
const moment = require("moment")

console.info("Loading settings")
settings.load()
moment.locale('fr')
console.log("Loading modules")
const modules = moduleLoader.load()
console.log("Starting bot")
const bot = new Alfred(modules)
bot.login()

// Ce fichier est le point d'entrée de l'application
// Ce fichier permet de démarrer tout les modules ainsi que le
// client discord