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

    // Numero de movimientos que lleva la partida
    const [moveNumber, setMoveNumber] = useState(0);

    // Tiempo de cada jugador
    const [timeW, setTimeW] = useState(0);
    const [timeB, setTimeB] = useState(0);

    // Tiempo inicial de cada jugador
    const [time, setTime] = useState(60000);

    useEffect(() => {
        if (!match.humanToPlay && matchState === "ongoing") {
            fetch("http://localhost:3001/compute",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    board: match.board,
                    toPlay: match.toPlay,
                    time: time
                })
            })
            .then((response) => response.json())
            .then((data) => {
                makePlay(data[0],data[1]);
                setMatchState(GameLogic.getWinner(match.board));
                setMoveNumber(m => m+1);
                setBoard(match.board);
            })
        }
    }, [board, matchState]);

    // Inicializa el tablero con los valores de col y row elegidos
    function setNewMatch() {
        setTimeW(time);
        setTimeB(time);
        makeEmptyBoard(row,col,playerW,playerB);
        setMatchState(GameLogic.getWinner(match.board));
        setMoveNumber(0);
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        if (matchState === "ongoing") {
            makePlay(row, col);
            setMatchState(GameLogic.getWinner(match.board));
            setMoveNumber(m => m+1);
            setBoard(match.board);
        }
    }

    function setTimeWhite(time: number) {
        if (time <= 0) {
            setMatchState("B")
        }
        setTimeW(Math.max(0,time));
    }

    function setTimeBlack(time: number) {
        if (time <= 0) {
            setMatchState("W")
        }
        setTimeB(Math.max(0,time));
    }

    return <div className="game-div">
        <Menu changeRow={setRow} changeCol={setCol} setNewBoard={setNewMatch} setPlayer1={setPlayerW} setPlayer2={setPlayerB} setTime={setTime}/>
        <div className="game-info-div">
            <GameInfo timeW={timeW} timeB={timeB} setTimeW={setTimeWhite} setTimeB={setTimeBlack} matchState={matchState} toPlay={match.toPlay} moveNumber={moveNumber}/>
            <div className="board-div">
                <Board board={board} onPlay={playMove} isHumanPlaying={getHumanToPlay} />
            </div>
        </div>
    </div>
}