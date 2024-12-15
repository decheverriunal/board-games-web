import GameLogic from "./gameLogic";

export const match = {
    board: [[""]],
    playerW: "nothuman",
    playerB: "nothuman",
    toPlay: "W",
    humanToPlay: true
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

export function getHumanToPlay() {
    return match.humanToPlay
}