"use client"

import Menu from "./Menu";
import Board from "./Board";
import GameInfo from "./GameInfo";
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
    const [matchState, setMatchState] = useState("");

    // Tiempo de cada jugador
    const [timeW, setTimeW] = useState(0.0);
    const [timeB, setTimeB] = useState(0.0);

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
        setTimeW(0);
        setTimeB(0);
        makeEmptyBoard(row,col,playerW,playerB);
        setMatchState(GameLogic.getWinner(match.board));
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        makePlay(row, col);
        setMatchState(GameLogic.getWinner(match.board));
        setBoard(match.board);
    }

    return <div className="game-div">
        <Menu changeRow={setRow} changeCol={setCol} setNewBoard={setNewMatch} setPlayer1={setPlayerW} setPlayer2={setPlayerB}/>
        <div className="game-info-div">
            <GameInfo timeW={timeW} timeB={timeB} setTimeW={setTimeW} setTimeB={setTimeB} matchState={matchState} toPlay={match.toPlay}/>
            <div className="board-div">
                <Board board={board} onPlay={playMove} isHumanPlaying={getHumanToPlay} />
            </div>
        </div>
    </div>
}