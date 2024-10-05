import GameLogic from "./gameLogic";

let matchBoard;
let matchToPlay;
let matchPlayer1;
let matchPlayer2;
let move = [0,0];
let humanToMove = false;
let matchLogic;

async function playGame(player1: unknown | "human", player2: unknown | "human", board: string[][], toPlay: string) {
    matchBoard = GameLogic.cloneBoard(board);
    matchToPlay = toPlay;
    matchPlayer1 = player1;
    matchPlayer2 = player2;
    move = [0,0];
    while (GameLogic.getWinner(matchBoard) === "ongoing") {
        if (matchToPlay === "W") {
            if (matchPlayer1 === "human") {
                move = await getHumanMove();
                matchBoard = GameLogic.makeMove(matchBoard, matchToPlay, move[0], move[1]);
            } else {
                move = await matchPlayer1.compute(matchBoard, matchToPlay); 
                matchBoard = GameLogic.makeMove(matchBoard, matchToPlay, move[0], move[1]);
            }
            matchToPlay = "B";
        } else {
            if (matchPlayer2 === "human") {
                move = await getHumanMove();
                matchBoard = GameLogic.makeMove(matchBoard, matchToPlay, move[0], move[1]);
            } else {
                move = await matchPlayer2.compute(matchBoard, matchToPlay); 
                matchBoard = GameLogic.makeMove(matchBoard, matchToPlay, move[0], move[1]);
            }
            matchToPlay = "W";
        }
    }
}

async function getHumanMove() {
    while (humanToMove) {

    }
    return move;
}

function getHumanToMove() {
    return humanToMove;
}

function setHumanToMoveFalse() {
    humanToMove = false;
}

function getMove() {
    return move;
}

function setMove(i: number, j: number) {
    move = [i, j];
}