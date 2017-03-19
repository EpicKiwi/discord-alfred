const request = require("request")
const math = require("mathjs")

exports.name = ":heavy_plus_sign: Calculator"

exports.regexes = [
    /Combien font :?(.*)/i
]

exports.help = [
    { example: "Combien font : 2+2 ?", description: "Je vous retourne la valeur correspondante" },
]

exports.onMessage = (message, matching) => {

    console.log(matching);
    //Consider remaining text as calculation
    var body = math.eval(matching.regexResult[1]);
    //Prompt Result mentionning the request's author
    message.channel.sendMessage(message.author + ", cela fait exactement " + body)

}