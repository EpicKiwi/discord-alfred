const fs = require("fs-extra")
const path = require("path")
const loadOrDefault = require("./lib/loadordefault").sync


module.exports = {

	settingsPath: path.resolve(__dirname,"../settings.json"),
    defaultSettingsPath: path.resolve(__dirname,"./defaults/settings.default.json"),

	load() {
		const loadedSettings = loadOrDefault(this.settingsPath,this.defaultSettingsPath)
		for(let property in loadedSettings){
			if(!this[property]){
				this[property] = loadedSettings[property]
			}
		}
		return this
	}

}