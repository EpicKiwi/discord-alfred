const request = require("request")

exports.name = "➕, ➖, ➗, Calculator"

exports.regexes = [
    /combien font :/i
]

exports.help = [
    { example: "Combien font : 2+2 ?", description: "Je vous retourne la valeur correspondante" },
]

exports.onMessage = (message, matching) => {
    //Remove Alfred Mention
    var calcul = String(message).replace(/<.*>/, "");
    //Remove Trigger
    var calcul = calcul.replace(/combien font :/i, "");
    //Consider remaining text as calculation
    var body = eval(calcul);
    //Prompt Result mentionning the request's author
    message.channel.sendMessage(message.author + ", cela fait exactement " + body)
}