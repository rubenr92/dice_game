export default class Dice {
    numberFaces:number
    value:number | undefined
    constructor(numberFaces = 6){
        this.numberFaces = numberFaces
        this.value = undefined
    }

    roll(){
        this.value = Math.floor(Math.random() * this.numberFaces) + 1
    }
}