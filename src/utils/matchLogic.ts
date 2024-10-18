import GameLogic from "./gameLogic";
import RandomPlayer from "./RandomPlayer";



export const match = {
    board: [[""]],
    playerW: "nothuman",
    playerB: "nothuman",
    toPlay: "W",
    humanToPlay: false
}

export function makeEmptyBoard(row: number, col: number, playerW: string, playerB: string) {
    match.playerW = playerW;
    match.playerB = playerB;
    match.board = [];
    const boardRow = [];
    for (let i = 0 ; i < col; i++) {
        boardRow.push(" ");
    }
    for (let i = 0; i < row; i++) {
        match.board.push([...boardRow]);
    }
    match.toPlay = "W";
    match.humanToPlay = (match.playerW === "human");
}

export function makePlay(row: number,col: number) {
    if (GameLogic.isMoveLegal(match.board,match.toPlay,row,col) && GameLogic.getWinner(match.board) === "ongoing") {
        match.board = GameLogic.makeMove(match.board,match.toPlay,row,col);
        if (match.toPlay === "W") {
            match.toPlay = "B";
            match.humanToPlay = (match.playerB === "human");
        } else {
            match.toPlay = "W";
            match.humanToPlay = (match.playerW === "human");
        }
    }
}

export function machineMove() {
    while (!match.humanToPlay && GameLogic.getWinner(match.board) === "ongoing") {
        const toMove = RandomPlayer.compute(match.board, match.toPlay);
        makePlay(toMove[0],toMove[1]);
    }
}

export function playerMove(row: number,col: number) {
    if (match.humanToPlay && GameLogic.getWinner(match.board) === "ongoing") {
        makePlay(row,col);
    }
}

export function getBoard() {
    return match.board;
}

export function getHumanToPlay() {
    return match.humanToPlay
}