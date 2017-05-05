<a name="module_AlfredModule"></a>

## AlfredModule
La classe d'un module du bot permettant de gèrer des conversations


* [AlfredModule](#module_AlfredModule)
    * [~AlfredModule](#module_AlfredModule..AlfredModule) : <code>AlfredModule</code>
        * [new AlfredModule()](#new_module_AlfredModule..AlfredModule_new)
        * [.init(bot)](#module_AlfredModule..AlfredModule+init)
        * [.start(regexes, callback)](#module_AlfredModule..AlfredModule+start)
        * [.state(regexes, callback, [test])](#module_AlfredModule..AlfredModule+state)
        * [.$getStartCase(matchingMessage)](#module_AlfredModule..AlfredModule+$getStartCase) ⇒ <code>MatchingCase</code> \| <code>null</code>
        * [.$getStateCase(matchingMessage)](#module_AlfredModule..AlfredModule+$getStateCase) ⇒ <code>MatchingCase</code> \| <code>null</code>
        * [.$createCase(regexes, callback, condition)](#module_AlfredModule..AlfredModule+$createCase) ⇒ <code>MatchingCase</code>
        * [.$stopConversation(matching, bot)](#module_AlfredModule..AlfredModule+$stopConversation)

<a name="module_AlfredModule..AlfredModule"></a>

### AlfredModule~AlfredModule : <code>AlfredModule</code>
Un module du bot

**Kind**: inner class of [<code>AlfredModule</code>](#module_AlfredModule)  

* [~AlfredModule](#module_AlfredModule..AlfredModule) : <code>AlfredModule</code>
    * [new AlfredModule()](#new_module_AlfredModule..AlfredModule_new)
    * [.init(bot)](#module_AlfredModule..AlfredModule+init)
    * [.start(regexes, callback)](#module_AlfredModule..AlfredModule+start)
    * [.state(regexes, callback, [test])](#module_AlfredModule..AlfredModule+state)
    * [.$getStartCase(matchingMessage)](#module_AlfredModule..AlfredModule+$getStartCase) ⇒ <code>MatchingCase</code> \| <code>null</code>
    * [.$getStateCase(matchingMessage)](#module_AlfredModule..AlfredModule+$getStateCase) ⇒ <code>MatchingCase</code> \| <code>null</code>
    * [.$createCase(regexes, callback, condition)](#module_AlfredModule..AlfredModule+$createCase) ⇒ <code>MatchingCase</code>
    * [.$stopConversation(matching, bot)](#module_AlfredModule..AlfredModule+$stopConversation)

<a name="new_module_AlfredModule..AlfredModule_new"></a>

#### new AlfredModule()
Crée le module de bot avec les options par défaut

<a name="module_AlfredModule..AlfredModule+init"></a>

#### alfredModule.init(bot)
Initialise le module

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  

| Param | Type | Description |
| --- | --- | --- |
| bot | <code>Alfred</code> | L'objet de bot |

<a name="module_AlfredModule..AlfredModule+start"></a>

#### alfredModule.start(regexes, callback)
Ajoute un cas de démarrage de conversation au moduleUne conversation avec le bot et plus précisement avec le module démarre des qu'unchat match avec la regex donnée. Cette fonction permet d'ajouter un cas de démarrageau module en cours.Il est recommendé d'utiliser cette fonction dans le constructeur d'un module enfant

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  

| Param | Type | Description |
| --- | --- | --- |
| regexes | <code>Array</code> | Un tableau de regexes permettant de match un chat |
| callback | <code>matchingCaseCallback</code> | La fonction à éxécuter dans le cas d'un match avec les regexes |

<a name="module_AlfredModule..AlfredModule+state"></a>

#### alfredModule.state(regexes, callback, [test])
Ajoute un cas de matching d'etape au moduleCe type de cas est appelé quand une conversation à deja été démarrée avec le module. Ce type de matching fonctionnecomme le matching de démarrage mais permet l'utilisation d'un callback de test permettant d'affiner le matching

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  

| Param | Type | Description |
| --- | --- | --- |
| regexes | <code>Array.&lt;regex&gt;</code> | Les regexes permettant le matching du message text |
| callback | <code>matchingCaseCallback</code> | Le callback appelé lors d'un matching |
| [test] | <code>matchingCaseTest</code> | La fonction de test permettant un matching plus fin |

<a name="module_AlfredModule..AlfredModule+$getStartCase"></a>

#### alfredModule.$getStartCase(matchingMessage) ⇒ <code>MatchingCase</code> \| <code>null</code>
Vérifie le matching d'un des cas de matching de démarrage du module

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  
**Returns**: <code>MatchingCase</code> \| <code>null</code> - Le cas de matching s'il en existe un ou null  

| Param | Type | Description |
| --- | --- | --- |
| matchingMessage | <code>MatchingMessage</code> | Le matching message incomplet sur lequel matcher |

<a name="module_AlfredModule..AlfredModule+$getStateCase"></a>

#### alfredModule.$getStateCase(matchingMessage) ⇒ <code>MatchingCase</code> \| <code>null</code>
Verifie le matching d'un des cas de matching d'etape du module

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  
**Returns**: <code>MatchingCase</code> \| <code>null</code> - Le cas de matching s'il existe ou null  

| Param | Type | Description |
| --- | --- | --- |
| matchingMessage | <code>MatchingMessage</code> | Le matching message incomplet a vérifier |

<a name="module_AlfredModule..AlfredModule+$createCase"></a>

#### alfredModule.$createCase(regexes, callback, condition) ⇒ <code>MatchingCase</code>
Crée un cas de matching sur la base d'arguments

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  
**Returns**: <code>MatchingCase</code> - Le cas de matching crée  

| Param | Type | Description |
| --- | --- | --- |
| regexes | <code>Array.&lt;regex&gt;</code> | Les regexes associées au cas de matching |
| callback | <code>matchingCaseCallback</code> | La fonction de callback du cas de matching |
| condition | <code>matchingCaseTest</code> | La fonction de test du cas de matching |

<a name="module_AlfredModule..AlfredModule+$stopConversation"></a>

#### alfredModule.$stopConversation(matching, bot)
Arrète la conversation en cours lors de l'envoie d'un mot clé de base

**Kind**: instance method of [<code>AlfredModule</code>](#module_AlfredModule..AlfredModule)  

| Param | Type | Description |
| --- | --- | --- |
| matching | <code>MatchingMessage</code> | Le message résultat du matching |
| bot | <code>Alfred</code> | L'objet représentant le bot lui même |
