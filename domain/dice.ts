export default class Dice {
    numberFaces:number
    constructor(numberFaces = 6){
        this.numberFaces = numberFaces
    }

    roll(){
        return Math.floor(Math.random() * this.numberFaces) + 1
    }
}