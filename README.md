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

Les modules sont les éléments permettant de répondre aux messages utilisateurs. Un module est composé d'un script et d'un fichier de grammaire dans un dossier au nom du module.

Le dossier contenant le module donne l'identifiant de ce module. Le script du module est aussi nommé suivant l'identifiant.

Par exemple pour le module `hello`, on retrouve la structure suivant :
```
hello
|- grammar.txt
|- hello.js
```

### Grammaire

Le fichier de grammaire possède les chaine de carractères permettant de matcher avec le message demandé. On écris alors le maximum de phrases d'exemples pouvant matcher avec les messages des utilisateurs.

Ces phrases seront comparés avec les messages des utilisateurs en suivant l'algorithme de [Jaro-winkler](https://github.com/NaturalNode/natural#string-distance). Si le matching dépasse la valeur de **minAccuracy**, la fonction `onMessage` du script sera appelée.

### Script

Le script est un module NodeJs standard. Ce module doit au moins contenir 2 éléments principaux.

* `name` : Une *chaine de carractères* représentant le nom du module différement de l'identifiant
* `onMessage` : Un *fonction* appelée lors du matching avec la grammaire du module, elle prends en paramètre un objet [Message](https://discord.js.org/#/docs/main/stable/class/Message) provenent de la librairie [Discord.js](https://discord.js.org)

On peut aussi y ajouter un élément en plus pour en etendre les fonctionnalités.

* `init` : Une *fonction* appelée lors du chargement du module au démarrage du bot
