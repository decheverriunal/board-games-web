import GameLogic from "./gameLogic";

//let n: number;

export default class RandomPlayer {
    constructor() {
    }

    static compute(board: string[][], toPlay: string, time: number) {
        for (let i = 0; i < 3000000000; i++) {
            
        }
        console.log(time);
        const availableMoves = GameLogic.getLegalMoves(board,toPlay);
        return availableMoves[Math.floor(Math.random()*availableMoves.length)];
    }
}