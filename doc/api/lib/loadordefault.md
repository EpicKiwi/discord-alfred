<a name="module_lib/loadOrDefault"></a>

## lib/loadOrDefault
Module permettant de charger le contenu d'un fichier JSON s'il existeS'il n'existe pas le fichier JSOn est copié depuis un fichier par défaut puis chargé

<a name="module_lib/loadOrDefault.sync"></a>

### lib/loadOrDefault.sync(path, defaultPath) ⇒ <code>object</code>
Charge de manière synchrone un fcihier JSON s'il existeS'il n'existe pas, le fichier par défaut est copié puis chargé

**Kind**: static method of [<code>lib/loadOrDefault</code>](#module_lib/loadOrDefault)  
**Returns**: <code>object</code> - Le contenu parsé du fichier JSON  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Le chemin du fichier a charger |
| defaultPath | <code>string</code> | Le chemin du fichier par defaut |
