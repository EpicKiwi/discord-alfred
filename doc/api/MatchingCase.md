<a name="module_MatchingCase"></a>

## MatchingCase
La classe d'un cas de matching


* [MatchingCase](#module_MatchingCase)
    * [module.exports](#exp_module_MatchingCase--module.exports) : <code>MatchingCase</code> ⏏
        * [new module.exports(regexes, callback, [test])](#new_module_MatchingCase--module.exports_new)
        * [~matchingCaseCallback](#module_MatchingCase--module.exports..matchingCaseCallback) : <code>function</code>
        * [~matchingCaseTest](#module_MatchingCase--module.exports..matchingCaseTest) : <code>function</code>

<a name="exp_module_MatchingCase--module.exports"></a>

### module.exports : <code>MatchingCase</code> ⏏
Un cas de matching.

**Kind**: Exported class  
<a name="new_module_MatchingCase--module.exports_new"></a>

#### new module.exports(regexes, callback, [test])
Construit un cas de matching


| Param | Type | Description |
| --- | --- | --- |
| regexes | <code>Array.&lt;regex&gt;</code> | Un tablea de regex permettant le permettant le matching |
| callback | <code>matchingCaseCallback</code> | La fonction de callback a appeler lors d'un matching |
| [test] | <code>matchingCaseTest</code> | La fonction de test permettant d'afinier le matching |

<a name="module_MatchingCase--module.exports..matchingCaseCallback"></a>

#### module.exports~matchingCaseCallback : <code>function</code>
Le callback appelé a la suite d'un match de cas de démarrage de conversation ou d'étape de conversation

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_MatchingCase--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| matching | <code>MatchingMessage</code> | L'objet de matching construit a partir du chat envoyé |
| bot | <code>Alfred</code> | L'objet représentant le robot lui même |

<a name="module_MatchingCase--module.exports..matchingCaseTest"></a>

#### module.exports~matchingCaseTest : <code>function</code>
Le callback de test d'un cas de matching

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_MatchingCase--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| conversation | <code>Conversation</code> | La conversation a laquelle appartien le message en cours de matching |