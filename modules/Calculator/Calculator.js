const request = require("request")
const math = require("mathjs")

exports.name = ":Pedobear: Calculator"

exports.regexes = [
    /combien font/i
]

exports.help = [
    { example: "Combien font : 2+2 ?", description: "Je vous retourne la valeur correspondante" },
]

exports.onMessage = (message, matching) => {

        //Remove Alfred Mention
        var calcul = String(message).replace(/<.*>/, "");
        //Remove "?"
        var calcul = calcul.replace(/\?/, "");
        //Remove ":"
        var calcul = calcul.replace(/:/, "");
        //Remove Trigger
        var calcul = calcul.replace(/combien font/i, "");
        //Replace sqrt by Math.sqrt
        var calcul = calcul.replace(/sqrt/i, "Math.sqrt");
        //Consider remaining text as calculation
        var body = math.eval(calcul);
        //Prompt Result mentionning the request's author
        message.channel.sendMessage(message.author + ", cela fait exactement " + body)
}