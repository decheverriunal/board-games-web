export default class GameLogic {

    toPlay: string;
    board: string[][];
    player1: unknown | "human";
    player2: unknown | "human";
    constructor() {
        this.toPlay = "W";
        this.board = [];
    }

    static cloneBoard(board: string[][]) {
        return [...board];
    }

    static isMoveLegal(board: string[][], player: string, i: number, j: number) {
        if (board[i][j] === " ") {
            return true;
        } else {
            return false;
        }
    }

    static getLegalMoves(board: string[][], player: string) {
        const moves = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++)
                if (this.isMoveLegal(board, player, i, j)) moves.push([i, j]);
        }
        return moves;
    }

    static canMove(board: string[][], player: string) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++)
                if (this.isMoveLegal(board, player, i, j)) return true;
        }
        return false;
    }

    static makeMove(board: string[][], player: string, i: number, j: number) {
        const nextBoard = board.slice();
        if (player === "W") {
            nextBoard[i][j] = "W";
        } else {
            nextBoard[i][j] = "B";
        }
        return nextBoard;
    }

    static getWinner(board: string[][]) {
        let lineLength = 0;
        let n = 0;
        let piece = "";
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] !== " ") {
                    piece = board[i][j];
                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j+n < board[0].length && board[i+n][j+n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j-n > -1 && board[i-n][j-n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > 4) return piece;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j-n > -1 && board[i+n][j-n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j+n < board[0].length && board[i-n][j+n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > 4) return piece;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && board[i+n][j] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && board[i-n][j] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > 4) return piece;

                    lineLength = 1;
                    n = 1;
                    while (j-n > -1 && board[i][j-n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (j+n < board[0].length && board[i][j+n] === piece) {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > 4) return piece;
                }
            }
        }
        if (!this.canMove(board, "W")) {
            return "tie";
        } else {
            return "ongoing";
        }
    }
}