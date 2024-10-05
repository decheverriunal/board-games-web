import GameLogic from "./gameLogic";

export default class RandomPlayer {
    constructor() {
    }

    static compute(board: string[][], toPlay: string) {
        const availableMoves = GameLogic.getLegalMoves(board,toPlay);
        return availableMoves[Math.floor(Math.random()*availableMoves.length)];
    }
}