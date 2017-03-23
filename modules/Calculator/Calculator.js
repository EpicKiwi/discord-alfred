const request = require("request")
const math = require("mathjs")

exports.name = "➕ Calculator"

exports.regexes = [
    /combien font\s?\:?(.*)?\??/ig,
    /resoud ?:? ?(.+)(?: ?\?)?/gi,
    /calcule ?:? ?(.+)(?: ?\?)?/gi,
    /[çc]a fait combien ?:? ?(.+)(?: ?\?)?/gi
]

exports.help = [
    { example: "Combien font : 2+2 ?", description: "Je vous retourne la valeur correspondante" },
]

exports.onMessage = (message, matching) => {

    try {
        console.log(matching);
        //Consider remaining text as calculation
        var body = math.eval(matching.regexResult[1]);
        //Prompt Result mentionning the request's author
        message.channel.sendMessage(message.author + ", cela fait exactement " + body);
    }

    catch (err) {
        message.channel.sendMessage("Désolé " + message.author + ", votre équation n'est pas valide.");
    }

}