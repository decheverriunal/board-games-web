"use client"

import Menu from "./Menu";
import Board from "./Board";
import GameLogic from "../utils/gameLogic";
import RandomPlayer from "@/utils/RandomPlayer";
//import { getMove, setMove, getHumanToMove, setHumanToMoveFalse, playGame } from "../utils/matchLogic";
import { useState } from 'react';

let humanToPlay = true;
let playerToPlay = "W";

let currentBoard = [[" "," "],[" "," "]];

export default function Game() {

    // Numero de filas y columnas
    const [row, setRow] = useState(2);
    const [col, setCol] = useState(2);

    // Tablero
    const [board, setBoard] = useState(currentBoard);

    // # del movimiento actual
    const [move, setMove] = useState(0);

    // Un jugador puede ser humano o maquina
    const [playerW, setPlayerW] = useState("human");
    const [playerB, setPlayerB] = useState("human");
    //const [humanToPlay, setHumanToPlay] = useState(true);

    //const [playerToPlay, setPlayerToPlay] = useState("W");

    // useEffect(() => {
    //     if (playerToPlay === "W") {
    //         setHumanToPlay(playerW === "human");
    //     } else {
    //         setHumanToPlay(playerB === "human");
    //     }
    // },[playerToPlay]);
    
    // Variables para almacenar un tablero y una fila de un tablero respectivamente,
    // para usar en funciones
    let nextBoard;
    let boardRow;

    // Inicializa el tablero con los valores de col y row elegidos
    function makeEmptyBoard() {
        nextBoard = [];
        boardRow = [];
        for (let i = 0 ; i < col; i++) {
            boardRow.push(" ");
        }
        for (let i = 0; i < row; i++) {
            nextBoard.push([...boardRow]);
        }
        setMove(0);
        currentBoard = nextBoard;
        setBoard(currentBoard);
        playerToPlay = "W";
        humanToPlay = (playerW === "human");
        if (playerW !== "human" && playerB !== "human") {
            console.log("a")
            makeBotsMatch();
        } else if (!humanToPlay) {
            const toMove = RandomPlayer.compute(board, playerToPlay);
            console.log("e")
            makePlay(toMove[0],toMove[1]);
        } else {
            console.log("i")
        }
    }

    // Realiza la jugada en el tablero, toma fila y columna como argumentos
    function makePlay(row: number,col: number) {
        if (GameLogic.isMoveLegal(board,playerToPlay,row,col)) {
            currentBoard = GameLogic.makeMove(board,playerToPlay,row,col);
            setBoard(currentBoard);
            if (playerToPlay === "W") {
                playerToPlay = "B";
                humanToPlay = (playerB === "human");
            } else {
                playerToPlay = "W";
                humanToPlay = (playerW === "human");
            }
            setMove(move + 1);
            if (!humanToPlay) {
                const toMove = RandomPlayer.compute(board, playerToPlay);
                makePlay(toMove[0],toMove[1]);
            }
        }
    }

    function makeBotsMatch() {
        let toMove;
        while (GameLogic.getWinner(board) === "ongoing") {
            toMove = RandomPlayer.compute(board, playerToPlay);
            makePlay(toMove[0],toMove[1]);
        }
    }

    return <>
        <div>
            <Menu changeRow={setRow} changeCol={setCol} setNewBoard={makeEmptyBoard} setPlayer1={setPlayerW} setPlayer2={setPlayerB}/>
        </div>
        <div>
            <Board board={board} onPlay={makePlay} isHumanPlaying={humanToPlay} />
        </div>
    </>
}