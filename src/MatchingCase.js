/**
 * La classe d'un cas de matching
 * @module MatchingCase
 */

/**
 * Un cas de matching.
 * Représente un cas d'activation d'un module, chaque cas possède une ou plusieurs regexes particulière permettant de
 * matcher un certain type de message texte, on associe aux regexes de ce cas une fonction de callback qui sera appelée
 * lors d'un match avec le message texte envoyé par l'utilisateur.
 * On peut aussi lui associer un fonction de condition permettant de vérifier que certaines conditions
 * sont validés en plus des regexes.
 * @type {MatchingCase}
 */
module.exports = class MatchingCase{

    /**
     * Le callback appelé a la suite d'un match de cas de démarrage de conversation ou d'étape de conversation
     *
     * @callback matchingCaseCallback
	 * @param {MatchingMessage} matching - L'objet de matching construit a partir du chat envoyé
	 * @param {Alfred} bot - L'objet représentant le robot lui même
     */

    /**
     * Le callback de test d'un cas de matching
     * Ce callback est appelé pour affiner le cas de matching. Il est appelé lors d'un matching d'une de regexes.
     * S'il renvoie true, le cas est validé et le callback de cas sera appelé.
     *
     * @callback matchingCaseTest
     * @param {Conversation} conversation - La conversation a laquelle appartien le message en cours de matching
     */

    /**
	 * Construit un cas de matching
     * @param {regex[]} regexes - Un tablea de regex permettant le permettant le matching
     * @param {matchingCaseCallback} callback - La fonction de callback a appeler lors d'un matching
     * @param {matchingCaseTest} [test] - La fonction de test permettant d'afinier le matching
     */
	constructor(regexes,callback,test){
		this.regexes = regexes
		this.callback = callback
		this.test = test
		this.regex = this.regexResult = this.evaluatedMessage = null
	}

    /**
	 * Test si le message text donné match avec ce cas
     * @param {MatchingMessage} matchingMessage - Un objet de matching message incomplet
     * @returns {Array|null} Le résultat de la regex si le matching est validé si non null
     */
	match(matchingMessage){
		this.evaluatedMessage = matchingMessage.evaluatedMessage
		for(let i = 0; i<this.regexes.length; i++){
			let regex = this.regexes[i]
			var regResult = regex.exec(matchingMessage.evaluatedMessage)
			console.log(`Evaluates ${regex} : ${regResult} `)
			if(regResult){
				this.regex = regex
				this.regexResult = regResult
				return regResult
			}
		}
		return null
	}

    /**
	 * Execute la fonction de callback assiciée a ce cas de matching
     * @param {MatchingMessage} matching - Le MatchingMessage complet et validé
     * @param {Alfred} bot - L'objet représentant le robot
     */
	exec(matching,bot){
		this.callback(matching,bot)
	}
}