const AlfredModule = require("../../AlfredModule")
const moduleUtils = require("../../lib/moduleUtils")
const randomElement = require("../../lib/randomElement")
const boardGenerator = require("./boardGenerator")
const BoardEnum = require("./BoardEnum")

module.exports = class ModuleHello extends AlfredModule {

    constructor(){
        super()

        this.icon = "🃏" //Un emoji
        this.name = "Morpion"
        this.help = [{example:"Je te défis au morpion"},
            {example: "Joue au morpion avec moi", description: "Tout ce que vous pouvez me demander"}]

        this.start([
                /d[ée]fi[se]? au morpion/i,
                /joue? au morpion/i,
                /d[ée]marre le morpion/i],
            this.startGame)
        this.state([/(\d+)/i],(m,b)=>this.playOne(m,b))
    }

    init(bot){
        super.init(bot)
        console.log("Tic-Tac-Toe module initialized")
    }

    startGame(matching,bot){
        matching.conversation.board = [
            [BoardEnum.EMPTY,BoardEnum.EMPTY,BoardEnum.EMPTY],
            [BoardEnum.EMPTY,BoardEnum.EMPTY,BoardEnum.EMPTY],
            [BoardEnum.EMPTY,BoardEnum.EMPTY,BoardEnum.EMPTY],
        ]
        matching.conversation.replyFile(boardGenerator(matching.conversation.board),"Très bien, c'est parti !",()=>{
            matching.conversation.reply("Vous pouvez commencer, donnez le chiffre sur lequel vous voulez placer votre cercle")
        })
    }

    playOne(matching,bot){
        if(matching.conversation.coolDown){
            matching.conversation.reply("je n'ai pas fini de jouer, veuillez patienter")
        }
        matching.conversation.coolDown = true;
        let board = matching.conversation.board;
        let dataGiven = parseInt(matching.case.regexResult[1])
        if(dataGiven <= board.length*board[0].length) {
            let coX = (dataGiven-1)%board[0].length
            let coY = ((dataGiven-1)-coX)/board[0].length
            if(board[coY][coX] == BoardEnum.EMPTY) {
                board[coY][coX] = BoardEnum.ROUND
                let winner = this.getWinner(board)
                if(!winner) {
                    this.playAi(board)
                    winner = this.getWinner(board)
                    if(!winner) {
                        matching.conversation.replyFile(boardGenerator(board), "Voilà !", () => {
                            matching.conversation.reply("À vous de jouer, donnez le chiffre sur lequel vous voulez placer votre cercle")
                            matching.conversation.coolDown = false;
                        })
                    }
                }
                if(winner){
                    if(winner == BoardEnum.CROSS)
                        matching.conversation.replyFile(boardGenerator(board), "Ahah, j'ai gagné !")
                    else if(winner == BoardEnum.ROUND)
                        matching.conversation.replyFile(boardGenerator(board), "Bravo, vous avez gagné !")
                    matching.conversation.coolDown = false;
                    matching.conversation.end()
                }
            } else {
                matching.conversation.reply("Cette case est déjà prise...")
            }
        } else {
            matching.conversation.reply("Vous devez donner un chiffre du plateau...")
        }
    }

    playAi(board){
        let avaliableCoordinates = []

        for(let j = 0; j<board.length; j++) {
            let line = board[j]
            for (let i = 0; i < line.length; i++) {
                let cell = line[i]
                if(cell == BoardEnum.EMPTY){
                    avaliableCoordinates.push({x:i,y:j})
                }
            }
        }

        let thisCell = randomElement(avaliableCoordinates)
        board[thisCell.y][thisCell.x] = BoardEnum.CROSS
    }

    getWinner(board){
        for(let j = 0; j<board.length; j++) {
            let line = board[j]
            for (let i = 0; i < line.length; i++) {
                let cell = line[i]
                if(cell != BoardEnum.EMPTY){
                    if((i-1 > -1 && i+1 < line.length && line[i-1] == cell && line[i+1] == cell)
                        || (j-1 > -1 && j+1 < board.length && board[j-1][i] == cell && board[j+1][i] == cell)
                        || (i-1 > -1 && i+1 < line.length && j-1 > -1 && j+1 < board.length && board[j-1][i-1] == cell && board[j+1][i+1] == cell)
                        || (i-1 > -1 && i+1 < line.length && j-1 > -1 && j+1 < board.length && board[j-1][i+1] == cell && board[j+1][i-1] == cell)){
                        return cell
                    }
                }
            }
        }
        return false;
    }
}