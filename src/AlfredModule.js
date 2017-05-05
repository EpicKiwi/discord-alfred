const randomel = require("./lib/randomElement")
const MatchingCase = require("./MatchingCase")

/**
 * La classe d'un module du bot permettant de gèrer des conversations
 * @module AlfredModule
 */

/**
 * Un module du bot
 * @type {AlfredModule}
 */
module.exports = class AlfredModule{

    /**
	 * Crée le module de bot avec les options par défaut
     */
	constructor(){
		this.$startCases = []
		this.$stateCases = []

		this.state([/oublie [çcs]a/i,
					/laisse tomber/i,
					/stop/i,
					/oublions? [çsc]a/i],
					this.$stopConversation)
	}

    /**
	 * Initialise le module
     * @param {Alfred} bot - L'objet de bot
     */
	init(bot){
		this.bot = bot
	}

    /**
	 * Ajoute un cas de démarrage de conversation au module
	 * Une conversation avec le bot et plus précisement avec le module démarre des qu'un
	 * chat match avec la regex donnée. Cette fonction permet d'ajouter un cas de démarrage
	 * au module en cours.
	 *
	 * Il est recommendé d'utiliser cette fonction dans le constructeur d'un module enfant
	 *
     * @param {Array} regexes - Un tableau de regexes permettant de match un chat
     * @param {matchingCaseCallback} callback - La fonction à éxécuter dans le cas d'un match avec les regexes
     */
	start(regexes,callback){
		this.$startCases.push(this.$createCase(regexes,callback,null))
	}

    /**
	 * Ajoute un cas de matching d'etape au module
     * Ce type de cas est appelé quand une conversation à deja été démarrée avec le module. Ce type de matching fonctionne
     * comme le matching de démarrage mais permet l'utilisation d'un callback de test permettant d'affiner le matching
     * @param {regex[]} regexes - Les regexes permettant le matching du message text
     * @param {matchingCaseCallback} callback - Le callback appelé lors d'un matching
     * @param {matchingCaseTest} [test] - La fonction de test permettant un matching plus fin
     */
	state(regexes,callback,test){
		this.$stateCases.push(this.$createCase(regexes,callback,test))
	}

    /**
     * Vérifie le matching d'un des cas de matching de démarrage du module
     *
     * @param {MatchingMessage} matchingMessage - Le matching message incomplet sur lequel matcher
     * @returns {MatchingCase|null} Le cas de matching s'il en existe un ou null
     */
	$getStartCase(matchingMessage){
		for(let i = 0; i<this.$startCases.length; i++){
			let theCase = this.$startCases[i]
			if(theCase.match(matchingMessage)){
				return theCase
			}
		}
		return null
	}

    /**
     * Verifie le matching d'un des cas de matching d'etape du module
     *
     * @param {MatchingMessage} matchingMessage - Le matching message incomplet a vérifier
     * @returns {MatchingCase|null} Le cas de matching s'il existe ou null
     */
	$getStateCase(matchingMessage){
		for(let i = 0; i<this.$stateCases.length; i++){
			let theCase = this.$stateCases[i]
			if(theCase.match(matchingMessage)){
				if(theCase.test){
					if(theCase.test(matchingMessage.conversation))
						return theCase
				} else {
					return theCase
				}
			}
		}
		return null
	}

    /**
     * Crée un cas de matching sur la base d'arguments
     *
     * @param {regex[]} regexes - Les regexes associées au cas de matching
     * @param {matchingCaseCallback} callback - La fonction de callback du cas de matching
     * @param {matchingCaseTest} condition - La fonction de test du cas de matching
     * @returns {MatchingCase} Le cas de matching crée
     */
	$createCase(regexes,callback,condition){
		return new MatchingCase(regexes,callback,condition)
	}

    /**
     * Arrète la conversation en cours lors de l'envoie d'un mot clé de base
     * @param {MatchingMessage} matching - Le message résultat du matching
     * @param {Alfred} bot - L'objet représentant le bot lui même
     */
	$stopConversation(matching,bot){
		matching.reply(randomel([
			"Ok",
			"Très bien",
			"Comme vous voulez..."]))
		matching.conversation.end()
	}
}