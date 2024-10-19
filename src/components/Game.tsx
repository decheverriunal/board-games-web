"use client"

import Menu from "./Menu";
import Board from "./Board";
import { match, makeEmptyBoard, makePlay, getHumanToPlay } from "../utils/matchLogic";
import { useEffect, useState } from 'react';
import GameLogic from "@/utils/gameLogic";

export default function Game() {

    // Numero de filas y columnas
    const [row, setRow] = useState(2);
    const [col, setCol] = useState(2);

    // Tablero
    const [board, setBoard] = useState(match.board);

    // Un jugador puede ser humano o maquina
    const [playerW, setPlayerW] = useState("human");
    const [playerB, setPlayerB] = useState("human");

    useEffect(() => {
        if (!match.humanToPlay && GameLogic.getWinner(match.board) === "ongoing") {
            fetch("http://localhost:3001/compute",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    board: match.board,
                    toPlay: match.toPlay
                })
            })
            .then((response) => response.json())
            .then((data) => {
                makePlay(data[0],data[1]);
                setBoard(match.board);
            })
        }
    }, [board]);

    // Inicializa el tablero con los valores de col y row elegidos
    function setNewMatch() {
        makeEmptyBoard(row,col,playerW,playerB);
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        makePlay(row, col);
        setBoard(match.board);
    }

    return <>
        <div>
            <Menu changeRow={setRow} changeCol={setCol} setNewBoard={setNewMatch} setPlayer1={setPlayerW} setPlayer2={setPlayerB}/>
        </div>
        <div>
            <Board board={board} onPlay={playMove} isHumanPlaying={getHumanToPlay} />
        </div>
    </>
}