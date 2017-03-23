const path = require("path")
const AlfredModule = require("./AlfredModule")
const fs = require("fs-extra")

module.exports = {
	
	modulesDir: path.resolve(__dirname,"./modules"),

	load(){
		let modules = []
		var modulesDirs = fs.readdirSync(this.modulesDir)
		for(let i = 0; i < modulesDirs.length; i++){
			let moduleId = modulesDirs[i]
			console.info("Loading module "+moduleId)
			try {
				var newModule = require(this.modulesDir+"/"+moduleId+"/"+moduleId)
			} catch(e) {
				console.error(`Error while loading ${moduleId}`)
				console.error(e)
			}
			modules.push(new newModule())
		}
		return modules
	}
}