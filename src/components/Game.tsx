"use client"

import Menu from "./Menu";
import Board from "./Board";
import GameLogic from "./gameLogic";
import { useState } from 'react';

export default function Game() {

    // Numero de filas y columnas
    const [row, setRow] = useState(2);
    const [col, setCol] = useState(2);

    // Tablero
    const [board, setBoard] = useState([[" "," "],[" "," "]]);

    // # del movimiento actual
    const [move, setMove] = useState(0);

    const [playerToPlay, setPlayerToPlay] = useState("W");

    const logic = new GameLogic();
    
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
        setBoard(nextBoard);
    }

    // Realiza la jugada en el tablero, toma fila y columna como argumentos
    function makePlay(row: number,col: number) {
        if (logic.isMoveLegal(board,playerToPlay,row,col)) {
            setBoard(logic.makeMove(board,playerToPlay,row,col));
            setMove(move + 1);
            setPlayerToPlay(playerToPlay === "W" ? "B" : "W");
        }
    }

    return <>
        <div>
            <Menu changeRow={setRow} changeCol={setCol} setNewBoard={makeEmptyBoard} />
        </div>
        <div>
            <Board board={board} onPlay={makePlay} />
        </div>
    </>
}