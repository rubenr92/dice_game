import Dice from '../domain/dice'
import { gameInterface } from '../domain/gameInterface'
import {userInterface} from '../domain/userInterface'
class GameHandler{

    player: userInterface
    dice1:Dice
    dice2:Dice

    constructor(player:userInterface, dice1:Dice, dice2:Dice){
        this.player = player
        this.dice1 = dice1
        this.dice2 = dice2
    }

    getResult(value1:number, value2:number):1|0{
        return value1 + value2 == 7 ? 1:0
    }

    play(){
        this.dice1.roll()
        this.dice2.roll()
        return [this.dice1.value, this.dice2.value]
    }

    getGame():gameInterface{
        const throwResult = this.play()
        const result = this.getResult(throwResult[1], throwResult[2])
        const gameValues = {roll1: throwResult[1], roll2: throwResult[2], result:result, playerId:this.player.name}

        return gameValues
    }
}