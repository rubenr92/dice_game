import { GameHandler } from "../application/gameHandler";

describe('gameHandler', () => {
    it('should create a new todo with the correct description', () => {
        const firstGame = new GameHandler({name:'Ruben', registerDate: new Date()}, 6, 6)
        firstGame.play()
        expect()
    });
 });