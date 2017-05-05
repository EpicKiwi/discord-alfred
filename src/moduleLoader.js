const path = require("path")
const AlfredModule = require("./AlfredModule")
const fs = require("fs-extra")

/**
 * Module en charge du chargement des modules du bot
 * @module moduleLoader
 */

module.exports = {

    /**
     * Le chemin absolu vers le dossier contenant les modules
     * du bot
     */
	modulesDir: path.resolve(__dirname,"./modules"),

    /**
     * Charge les modules depuis le dossier spécifié puis
     * renvoie le tableau de tout les modules chargés
     * @returns {AlfredModule[]} Les modules chargés
     */
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