import GameLogic from "@/components/gameLogic";

class MinimaxNode {
    logic: any;
    board: string[][];
    score: number;
    moves: object[];
    player: string;
    bestNode: any;
    lastMove: any;
    constructor(board: string[][], player: string, lastMove: any) {
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
        
        return evalScore;
    }

    fillChildNodesScores(){
        const allMoves = this.logic.getLegalMoves(this.board, this.player);
        let newBoard;
        let addNode;
        for (const move of allMoves) {
            newBoard = this.logic.clone(this.board);
            this.logic.makeMove(newBoard, move[0], move[1], this.player);
            addNode = new MinimaxNode(newBoard, this.player === "B" ? "W" : "B", move)
            this.moves.push(addNode);
            //console.log(addNode);
        }
        this.moves.sort(this.player === "W" ? this.orderConditionWhite : this.orderConditionBlack);
        this.bestNode = this.moves[0];
        //console.log(this.mul ? "W" : "B");
        //console.log(this.bestNode);
        
    }

    orderConditionWhite(A: object, B: object) {
        return B.score - A.score;
    }

    orderConditionBlack(A: object, B: object) {
        return A.score - B.score;
    }
}

class BasePlayer {
    head: any;
    start: boolean;
    logic: any;
    color: string;
    time: number;
    constructor(color: string, time: number) {
        this.color = color;
        this.time = time;
        this.logic = new GameLogic();
        this.head = null;
        this.start = true;
    }

    compute(board: string[][], _time: never) {
        //if start of game make first move
        if (this.start && this.color === "W") {
            this.head = new MinimaxNode(board, "W", null);
            this.head.fillChildNodesScores();
            this.head = this.head.bestNode;
            this.start = false;
            return this.head.lastMove;
        } else if (this.start && this.color === "B") {
            this.head = new MinimaxNode(board, "B", null);
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
                    this.head = new MinimaxNode(board, this.color, null);
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
        this.head = new MinimaxNode(board, this.color, null);

        this.head.fillChildNodesScores();
        this.head = this.head.bestNode;
        return this.head.lastMove;
    }

}

export default BasePlayer;