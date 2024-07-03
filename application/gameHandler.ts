import Dice from '../domain/dice'
import { gameInterface } from '../domain/gameInterface'
import {userInterface} from '../domain/userInterface'

class GameHandler{

    player: userInterface
    dice1:Dice
    dice2:Dice

    constructor(player:userInterface, numFaces1:number, numFaces2:number){
        this.player = player
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

    getGame():gameInterface{

        return {roll1: this.dice1.value, roll2: this.dice2.value, result:this.result, playerId:this.player.name}
    }
}

export {GameHandler}


const firstGame = new GameHandler({name:'Ruben', registerDate: new Date()}, 6, 6)
firstGame.play()
console.log(firstGame.getGame())