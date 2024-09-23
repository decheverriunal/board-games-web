class GameLogic {

    toPlay: string;
    board: string[][];
    player1: unknown | "human";
    player2: unknown | "human";
    constructor() {
        this.toPlay = "W";
        this.board = [];
    }

    cloneBoard(board: string[][]) {
        return [...board];
    }

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

    getWinner(board: string[][]) {
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
        if (!this.canMove(this.board, "W")) {
            return "tie";
        } else {
            return "ongoing";
        }
    }

    async playGame(player1: unknown | "human", player2: unknown | "human", board: string[][], toPlay: string) {
        this.board = this.cloneBoard(board);
        this.toPlay = toPlay;
        this.player1 = player1;
        this.player2 = player2;
        let move = [0,0];
        while (this.getWinner(this.board) === "ongoing") {
            if (this.toPlay === "W") {
                if (this.player1 === "human") {
                    move = await getHumanMove();
                    this.board = this.makeMove(this.board, this.toPlay, move[0], move[1]);
                } else {
                    move = await this.player1.compute(this.board, this.toPlay); 
                    this.board = this.makeMove(this.board, this.toPlay, move[0], move[1]);
                }
                this.toPlay = "B";
            } else {
                if (this.player2 === "human") {
                    move = await getHumanMove();
                    this.board = this.makeMove(this.board, this.toPlay, move[0], move[1]);
                } else {
                    move = await this.player2.compute(this.board, this.toPlay); 
                    this.board = this.makeMove(this.board, this.toPlay, move[0], move[1]);
                }
                this.toPlay = "W";
            }
        }
    }
}

export default GameLogic;