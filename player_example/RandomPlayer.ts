import GameLogic from "./gameLogic";

//let n: number;

export default class RandomPlayer {
    constructor() {
    }

    static compute(board: string[][], toPlay: string) {
        for (let i = 0; i < 10000000; i++) {
            
        }
        //console.log(n);
        const availableMoves = GameLogic.getLegalMoves(board,toPlay);
        return availableMoves[Math.floor(Math.random()*availableMoves.length)];
    }
}