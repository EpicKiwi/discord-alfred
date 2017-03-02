# discord-alfred
Un bot discord en Javascript

## Installation

Installez les dépendances

```
npm install
```

Démarrez le serveur

```
node bot.js [token]
```

## Paramètres

les paramètres sont contenus dans le fichier `settings.js`. Ce fichier permet de configurer l'ensemble du bot de manière générale.

* **token** : Le token d'accès au bot, par defaut, le premier paramètre passé lors du démarrage
* **onlyChannel** : Permet d'enfermer les réponses du bot dans une channel spécifique
* **channel** : Le nom de la channel utilisée par le bot quand *onlyChannel* est actif
* **modulesDir** : Le dossier contenant les modules du bot
* **minAccuracy** : La valeur minimum acceptable pour démarrer un module sur un message
* **onlyMention** : Si actif, le bot ne répondra qu'aux messages faisant explicitement la mention du bot

## Modules

Les modules sont les éléments permettant de répondre aux messages utilisateurs. Un module est composé d'un script et, éventuellement, d'un fichier de grammaire dans un dossier au nom du module.

Le dossier contenant le module donne l'identifiant de ce module. Le script du module est aussi nommé suivant l'identifiant.

Par exemple pour le module `hello`, on retrouve la structure suivant :
```
hello
|- grammar.txt
|- hello.js
```

### Grammaire

Le fichier de grammaire *facultatif* possède les chaine de carractères permettant de matcher avec le message demandé. On écris alors le maximum de phrases d'exemples pouvant matcher avec les messages des utilisateurs.

Ces phrases seront comparés avec les messages des utilisateurs en suivant l'algorithme de [Jaro-winkler](https://github.com/NaturalNode/natural#string-distance). Si le matching dépasse la valeur de **minAccuracy**, la fonction `onMessage` du script sera appelée.

### Script

Le script est un module NodeJs standard. Ce module doit au moins contenir 2 éléments principaux.

* `name` : Une *chaine de carractères* représentant le nom du module différement de l'identifiant
* `onMessage` : Un *fonction* appelée lors du matching avec la grammaire du module, elle prends en paramètre un objet [Message](https://discord.js.org/#/docs/main/stable/class/Message) provenent de la librairie [Discord.js](https://discord.js.org), un objet `match` définis un objet de matching définit plus bas, et enfin l'objet `bot` représentant le [client discord.js](https://discord.js.org/#/docs/main/stable/class/Client)

On peut aussi y ajouter un élément en plus pour en etendre les fonctionnalités.

* `init` : Une *fonction* appelée lors du chargement du module au démarrage du bot
* `regexes` : Un *tableau de regex* facultatif permettant de matcher les messages utilisateurs, les regex possèdent une valeur de matching de 1; elles passent donc en priorité face a la grammaire

#### Objet de matching

l'objet de matching comprends les clés suivantes :

* `module` : le module séléctionné par le système (votre module normalement)
* `value` : degré de confience dans le matching (1 dans le cas d'un matchin parfait ou vie une regex)
* `grammarString` : *dans le cas d'un matching par grammaire* contiens la chaine de carractère d'exemple ressemblant le plus au message
* `regex` : *dans le cas d'un matching par regex* contiens la regex utilisée pour matcher le message
* `regexResult` : *dans le cas d'un matching par regex* contiens un tableau comprenant la chaine de carractères matchée puis chacune des prenthèses capturantes; on tulise ici la méthode [exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
* `evaluated` : La chaine de carractère analysée pour matcher
