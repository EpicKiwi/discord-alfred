exports.MatchingData = class MatchingData {
	constructor(matchingText,method){
		this.matchingText = matchingText
		this.method = method
	}
}

exports.MatchingMethod = {
	GRAMMAR: 0,
	REGEX: 1,
	UNKNOWN: 2,
}