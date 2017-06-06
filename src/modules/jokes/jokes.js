const AlfredModule = require("../../AlfredModule")
const fs = require("fs")
const Joke = require("./Joke")

const usersJokesFile = __dirname+"/users-jokes.json"
const alfredJokesFile = __dirname+"/alfred-jokes.json"

module.exports = class ModuleHello extends AlfredModule {

    constructor() {
        super()

        this.icon = "😂" //Un emoji
        this.name = "Blagues"
        this.help = [
            {example: "Raconte moi une blague"},
            {example: "Connais-tu une blague ?", description: "Je vous raconte une blague"},
            {example: "Apprend cette blague : [votre blague]", description: "J'ajouterais la blague à mon repertoire"},
        ]

        this.jokes = []

        this.start([/raconte moi une blague/i,
                /diverti[es]?[- ]moi/i,
                /connais[- ]tu une blague( \?)?/i,
                /fais moi rire( !)?/i],
            (message,bot)=>this.tellJoke(message,bot))

        this.start([/(?:ajoute|apprend?) cette blague ?: ?((?:[\n\r]|.)+)/i],(message,bot)=>this.addJoke(message,bot))
    }

    init(bot){
        super.init(bot)
        let alfredJokes = JSON.parse(fs.readFileSync(alfredJokesFile,"utf8"))
        for(let jokeindex in alfredJokes){
            this.jokes.push(new Joke(alfredJokes[jokeindex]))
        }

        let rawUsersJokes = null
        try{
            fs.accessSync(usersJokesFile)
            rawUsersJokes = fs.readFileSync(usersJokesFile,"utf8")
        } catch(e){
            fs.writeFileSync(usersJokesFile,JSON.stringify([]))
            rawUsersJokes = JSON.stringify([])
        }
        let usersJokes = JSON.parse(rawUsersJokes)
        for(let jokeindex in usersJokes){
            this.jokes.push(new Joke(usersJokes[jokeindex]))
        }
        console.info("Loaded "+this.jokes.length+" jokes")
    }

    tellJoke(matching,bot) {
        let joke = this.jokes[Math.round(Math.random()*(this.jokes.length-1))]
        matching.conversation.reply(joke.toString())
        matching.conversation.end()
    }

    addJoke(matching,bot){
        this.jokes.push(new Joke(matching.case.regexResult[1],matching.message.author.username))
        this.saveUsersJokes()
        matching.reply("Merci "+matching.message.author+", je l'ai ajoutée à mon repertoire :)")
        matching.conversation.end()
    }

    saveUsersJokes(){
        let toSaveJokes = []
        for(let jokeIndex in this.jokes){
            if(this.jokes[jokeIndex].author){
                toSaveJokes.push(this.jokes[jokeIndex])
            }
        }
        fs.writeFile(usersJokesFile,JSON.stringify(toSaveJokes),(err) => {
            if(err){
                console.error(err)
                return
            }
            console.info("Jokes saved")
        })
    }

}