import GameLogic from "./gameLogic";

export const newMatchParams = {
    rows: 1,
    cols: 1,
    time: 60000,
    playerW: "nothuman",
    playerB: "nothuman"
}

export const match = {
    board: [[""]],
    playerW: "nothuman",
    playerB: "nothuman",
    toPlay: "W",
    humanToPlay: true,
    moveNumber: 0,
    timeWhite: 60000,
    timeBlack: 60000
}

export function makeEmptyBoard() {
    match.playerW = newMatchParams.playerW;
    match.playerB = newMatchParams.playerB;
    match.board = [];
    const boardRow = [];
    for (let i = 0; i < newMatchParams.cols; i++) {
        boardRow.push(" ");
    }
    for (let i = 0; i < newMatchParams.rows; i++) {
        match.board.push([...boardRow]);
    }
    match.toPlay = "W";
    match.humanToPlay = (match.playerW === "human");
    match.moveNumber = 0;
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
        match.moveNumber += 1;
    }
}

export function getHumanToPlay() {
    return match.humanToPlay
}