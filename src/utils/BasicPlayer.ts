import GameLogic from "./gameLogic";

class MinimaxNode {
    logic: GameLogic;
    board: string[][];
    score: number;
    moves: MinimaxNode[];
    player: string;
    bestNode: any;
    lastMove: number[];
    constructor(board: string[][], player: string, lastMove: number[]) {
        this.logic = new GameLogic();
        this.board = board;
        this.score = this.staticEval(board,player);
        this.moves = [];
        this.player = player;
        this.bestNode = null;
        this.lastMove = lastMove;
    }

    staticEval(board: string[][], player: string){
        let evalScore = 0;
        let longestLineWhite = 0;
        let longestLineBlack = 0;
        let lineLength = 0;
        let n = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === "W") {
                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j+n < board[0].length && board[i+n][j+n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j-n > -1 && board[i-n][j-n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineWhite) longestLineWhite = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j-n > -1 && board[i+n][j-n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j+n < board[0].length && board[i-n][j+n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineWhite) longestLineWhite = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && board[i+n][j] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && board[i-n][j] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineWhite) longestLineWhite = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (j-n > -1 && board[i][j-n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (j+n < board[0].length && board[i][j+n] === "W") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineWhite) longestLineWhite = lineLength;
                } else if (board[i][j] === "B") {
                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j+n < board[0].length && board[i+n][j+n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j-n > -1 && board[i-n][j-n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineBlack) longestLineBlack = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && j-n > -1 && board[i+n][j-n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && j+n < board[0].length && board[i-n][j+n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineBlack) longestLineBlack = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (i+n < board.length && board[i+n][j] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (i-n > -1 && board[i-n][j] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineBlack) longestLineBlack = lineLength;

                    lineLength = 1;
                    n = 1;
                    while (j-n > -1 && board[i][j-n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    n = 1;
                    while (j+n < board[0].length && board[i][j+n] === "B") {
                        lineLength += 1;
                        n += 1;
                    }
                    if (lineLength > longestLineBlack) longestLineBlack = lineLength;
                }
            }
        }
        if (longestLineWhite > 4) {
            evalScore = 1000;
        } else if (longestLineBlack > 4) {
            evalScore = -1000;
        } else if (longestLineWhite === 4 && player === "W") {
            evalScore = 800;
        } else if (longestLineBlack === 4 && player === "B") {
            evalScore = -800;
        } else if (longestLineWhite === 3 && player === "W") {
            evalScore = 400;
        } else if (longestLineBlack === 3 && player === "B") {
            evalScore = -400;
        }

        return evalScore;
    }

    fillChildNodesScores(){
        const allMoves = GameLogic.getLegalMoves(this.board, this.player);
        let newBoard;
        let addNode;
        for (const move of allMoves) {
            newBoard = GameLogic.cloneBoard(this.board);
            GameLogic.makeMove(newBoard, this.player, move[0], move[1]);
            addNode = new MinimaxNode(newBoard, this.player === "B" ? "W" : "B", move)
            this.moves.push(addNode);
            //console.log(addNode);
        }
        this.moves.sort(this.player === "W" ? this.orderConditionWhite : this.orderConditionBlack);
        this.bestNode = this.moves[0];
        //console.log(this.mul ? "W" : "B");
        //console.log(this.bestNode);
        
    }

    orderConditionWhite(A: MinimaxNode, B: MinimaxNode) {
        return B.score - A.score;
    }

    orderConditionBlack(A: MinimaxNode, B: MinimaxNode) {
        return A.score - B.score;
    }
}

class BasicPlayer {
    head: any;
    start: boolean;
    logic: GameLogic;
    color: string;
    constructor(color: string) {
        this.color = color;
        this.logic = new GameLogic();
        this.head = null;
        this.start = true;
    }

    compute(board: string[][], toPlay: string) {
        //if start of game make first move
        if (this.start) {
            this.head = new MinimaxNode(board, toPlay, []);
            this.head.fillChildNodesScores();
            this.head = this.head.bestNode;
            this.start = false;
            return this.head.lastMove;
        }

        //if not start of game update head
        this.head.fillChildNodesScores();
        let detectedMove = null;
        for (const elem of this.head.moves) {
            const i = elem.lastMove[0];
            const j = elem.lastMove[1];
            if (board[i][j] != " ") {
                if (detectedMove != null) {
                    this.head = new MinimaxNode(board, toPlay, []);
                    this.head.fillChildNodesScores();
                    this.head = this.head.bestNode;
                    return this.head.lastMove;
                }
                detectedMove = elem;
            }
        }
        if (detectedMove != null) {
            this.head = detectedMove;
            this.head.fillChildNodesScores();
            this.head = this.head.bestNode;
            return this.head.lastMove;
        }
        //if opponent cant move
        this.head = new MinimaxNode(board, toPlay, []);

        this.head.fillChildNodesScores();
        this.head = this.head.bestNode;
        return this.head.lastMove;
    }

}

export default BasicPlayer;