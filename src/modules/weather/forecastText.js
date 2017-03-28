const frenchOwm = require("./frenchOwmEquivalent")

exports.fromId = function(owmId){
	return frenchOwm[owmId.toString()]
}