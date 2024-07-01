import { gameInterface } from "./gameInterface";
import Dice from "./dice"


class Game implements gameInterface{
    dice: Dice = new Dice(6)
    roll1:number;
    roll2:number;
    result:0|1;
    playerId: String;

    constructor(playerId:string){
        this.playerId = playerId
    }

    play(){
        this.roll1 = this.dice.roll()
        this.roll2 = this.dice.roll()
        this.result = this.roll1 + this.roll2 == 7 ? 1 : 0
    }

    getGame():gameInterface{
        return {roll1:this.roll1, roll2:this.roll2, result:this.result, playerId:this.playerId}
    }
}

export {Game}