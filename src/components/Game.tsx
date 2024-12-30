"use client"

import Menu from "./Menu";
import Board from "./Board";
import GameInfo from "./GameInfo";
import { match, newMatchParams, makeEmptyBoard, makePlay, getHumanToPlay } from "../utils/matchLogic";
import { useEffect, useState } from 'react';
import GameLogic from "@/utils/gameLogic";
import "./Game.css";

let timeWhite = 0;
let timeBlack = 0;

export default function Game() {

    // Tablero
    const [board, setBoard] = useState(match.board);

    // Un jugador puede ser humano o maquina
    const [playerW, setPlayerW] = useState("human");
    const [playerB, setPlayerB] = useState("human");

    // Estado de la partida actual
    const [matchState, setMatchState] = useState("");

    // Tiempo de cada jugador
    const [timeW, setTimeW] = useState(0);
    const [timeB, setTimeB] = useState(0);

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
                    time: match.toPlay === "W" ? timeWhite : timeBlack
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(timeWhite)
                console.log(timeBlack)
                if (matchState === "ongoing" && timeWhite > 0 && timeBlack > 0) {
                    makePlay(data[0],data[1]);
                    setMatchState(GameLogic.getWinner(match.board));
                    setBoard(match.board);
                }
            })
        }
    }, [board, matchState]);

    // Inicializa el tablero con los valores de col y row elegidos
    function setNewMatch() {
        setTimeW(newMatchParams.time);
        timeWhite = newMatchParams.time;
        setTimeB(newMatchParams.time);
        timeBlack = newMatchParams.time;
        makeEmptyBoard(playerW,playerB);
        setMatchState(GameLogic.getWinner(match.board));
        match.moveNumber = 0;
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        if (matchState === "ongoing") {
            makePlay(row, col);
            setMatchState(GameLogic.getWinner(match.board));
            setBoard(match.board);
        }
    }

    function setTimeWhite(time: number) {
        if (time <= 0) {
            setMatchState("B")
        }
        setTimeW(Math.max(0,time));
        timeWhite = Math.max(0,time);
    }

    function setTimeBlack(time: number) {
        if (time <= 0) {
            setMatchState("W")
        }
        setTimeB(Math.max(0,time));
        timeBlack = Math.max(0,time);
    }

    return <div className="game-div">
        <Menu setNewBoard={setNewMatch} setPlayer1={setPlayerW} setPlayer2={setPlayerB}/>
        <div className="game-info-div">
            <GameInfo timeW={timeW} timeB={timeB} setTimeW={setTimeWhite} setTimeB={setTimeBlack} matchState={matchState} toPlay={match.toPlay}/>
            <div className="board-div">
                <Board board={board} onPlay={playMove} isHumanPlaying={getHumanToPlay} />
            </div>
        </div>
    </div>
}