export default class Dice {
    numberFaces:number
    value:number
    constructor(numberFaces = 6){
        this.numberFaces = numberFaces
        this.value = 0
    }

    roll(){
        this.value = Math.floor(Math.random() * this.numberFaces) + 1
    }
}