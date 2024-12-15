"use client"

import Menu from "./Menu";
import Board from "./Board";
import { match, makeEmptyBoard, makePlay, getHumanToPlay } from "../utils/matchLogic";
import { useEffect, useState } from 'react';
import GameLogic from "@/utils/gameLogic";
import "./Game.css";

export default function Game() {

    // Numero de filas y columnas
    const [row, setRow] = useState(2);
    const [col, setCol] = useState(2);

    // Tablero
    const [board, setBoard] = useState(match.board);

    // Un jugador puede ser humano o maquina
    const [playerW, setPlayerW] = useState("human");
    const [playerB, setPlayerB] = useState("human");

    // Estado de la partida actual
    const [matchState, setMatchState] = useState("ongoing");

    useEffect(() => {
        if (!match.humanToPlay && matchState === "ongoing") {
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
                setMatchState(GameLogic.getWinner(match.board));
                setBoard(match.board);
            })
        }
    }, [board, matchState]);

    // Inicializa el tablero con los valores de col y row elegidos
    function setNewMatch() {
        makeEmptyBoard(row,col,playerW,playerB);
        setMatchState(GameLogic.getWinner(match.board));
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        makePlay(row, col);
        setMatchState(GameLogic.getWinner(match.board));
        setBoard(match.board);
    }

    function displayWinner() {
        if (matchState === "W") {
            return "White wins!"
        } else if (matchState === "B") {
            return "Black wins!"
        } else if (matchState === "tie") {
            return "Tie!"
        } else {
            return ""
        }
    }

    return <div className="game-div">
        <Menu changeRow={setRow} changeCol={setCol} setNewBoard={setNewMatch} setPlayer1={setPlayerW} setPlayer2={setPlayerB}/>
        <div className="game-info-div">
            <h1 className="winner-div">{displayWinner()}</h1>
            <div className="board-div">
                <Board board={board} onPlay={playMove} isHumanPlaying={getHumanToPlay} />
            </div>
        </div>
    </div>
}