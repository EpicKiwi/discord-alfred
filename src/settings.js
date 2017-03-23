const fs = require("fs-extra")
const path = require("path")
const loadOrDefault = require("./lib/loadordefault").sync
const settingsPath = path.resolve(__dirname,"../settings.json")
const defaultSettingsPath = path.resolve(__dirname,"./defaults/settings.default.json")

module.exports = {

	load() {
		const loadedSettings = loadOrDefault(settingsPath,defaultSettingsPath)
		for(let property in loadedSettings){
			if(!this[property]){
				this[property] = loadedSettings[property]
			}
		}
		return this
	}

}