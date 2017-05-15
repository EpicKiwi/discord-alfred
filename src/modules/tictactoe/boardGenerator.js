const fs = require("fs")
const Canvas = require('canvas')
const moment = require("moment")
const path = require("path")
const BoardEnum = require("./BoardEnum")

module.exports = function(board){
    let canvas = new Canvas(300, 300)
        , ctx = canvas.getContext('2d')
    //Dessin de l'arrière plan
    ctx.fillStyle = "#36393e"		//Couleur de remplissage
    ctx.fillRect(0,0,300,300)		//Dessin de l'arrière plan

    ctx.fillStyle = "#c3cee0"		//Couleur de police
    ctx.strokeStyle = "#c3cee0"		//Couleur de contour
    ctx.font = "16pt Verdana"
    ctx.lineCap = "round"
    ctx.textAlign = "center"          //Alignement
    ctx.textBaseline = "middle"        //Emplacement de base
    ctx.lineWidth = 5

    ctx.beginPath()
    ctx.moveTo(106,20)
    ctx.lineTo(106,280)
    ctx.moveTo(192,20)
    ctx.lineTo(192,280)
    ctx.moveTo(20,106)
    ctx.lineTo(280,106)
    ctx.moveTo(20,192)
    ctx.lineTo(280,192)
    ctx.stroke()

    for(let j = 0; j<board.length; j++){
        let line = board[j]
        for(let i = 0; i<line.length; i++){
            let cell = line[i]
            let cellNumber = i+1+(j*board[i].length);
            let centerX = 63+(i*86);
            let centerY = 63+(j*86);
            if(cell == BoardEnum.CROSS){
                ctx.save()
                ctx.strokeStyle = "#B60400"
                ctx.beginPath()
                ctx.moveTo(centerX-23,centerY-23)
                ctx.lineTo(centerX+23,centerY+23)
                ctx.moveTo(centerX+23,centerY-23)
                ctx.lineTo(centerX-23,centerY+23)
                ctx.stroke()
                ctx.restore()
            }if(cell == BoardEnum.ROUND){
                ctx.save()
                ctx.strokeStyle = "#0DB600"
                ctx.beginPath()
                ctx.arc(centerX, centerY, 23, 0, 2 * Math.PI)
                ctx.stroke()
                ctx.restore()
            }else if(cell == BoardEnum.EMPTY){
                ctx.fillText(`${cellNumber}`,centerX,centerY)
            }
        }
    }

    return canvas.toBuffer()
}

