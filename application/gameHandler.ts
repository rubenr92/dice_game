import Dice from '../domain/dice'
import { gameInterface } from '../domain/gameInterface'
import {userInterface} from '../domain/userInterface'

class GameHandler{

    playerId: string
    dice1:Dice
    dice2:Dice

    constructor(playerId:string, numFaces1:number, numFaces2:number){
        this.playerId = playerId
        this.dice1 = new Dice(numFaces1)
        this.dice2 = new Dice(numFaces2)
    }

    get result():1|0{
        return this.dice1.value + this.dice2.value == 7 ? 1:0
    }

    play(){
        this.dice1.roll()
        this.dice2.roll()
    }

    get gameValues():gameInterface{

        return {roll1: this.dice1.value, roll2: this.dice2.value, result:this.result, playerId:this.playerId}
    }
}

export {GameHandler}


const firstGame = new GameHandler('Ruben', 6, 6)
firstGame.play()
console.log(firstGame.gameValues)