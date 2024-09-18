class GameLogic {
    constructor() {}

    isMoveLegal(board: string[][], player: string, i: number, j: number) {
        if (board[i][j] === " ") {
            return true;
        } else {
            return false;
        }
    }

    getLegalMoves(board: string[][], player: string) {
        const moves = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++)
                if (this.isMoveLegal(board, player, i, j)) moves.push([i, j]);
        }
        return moves;
    }

    canMove(board: string[][], player: string) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++)
                if (this.isMoveLegal(board, player, i, j)) return true;
        }
        return false;
    }

    makeMove(board: string[][], player: string, i: number, j: number) {
        const nextBoard = board.slice();
        if (player === "W") {
            nextBoard[i][j] = "W";
        } else {
            nextBoard[i][j] = "B";
        }
        return nextBoard;
    }
}

export default GameLogic;