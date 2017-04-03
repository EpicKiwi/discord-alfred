const fs = require("fs-extra")

module.exports = {
	sync(path,defaultPath){
		try{
			fs.accessSync(path)
		} catch(e) {
			if(e.code == "ENOENT"){
				fs.copySync(defaultPath,path)
			} else {
				throw e
			}
		}
		return JSON.parse(fs.readFileSync(path))
	}
}