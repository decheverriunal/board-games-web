"use client"

import Menu from "./Menu";
import Board from "./Board";
import GameInfo from "./GameInfo";
import { match, newMatchParams, makeEmptyBoard, makePlay } from "../utils/matchLogic";
import { useState } from 'react';
import GameLogic from "@/utils/gameLogic";
import "./Game.css";

export default function Game() {

    // Tablero
    const [board, setBoard] = useState(match.board);

    // Estado de la partida actual
    const [matchState, setMatchState] = useState("");

    // Inicializa el tablero con los valores de col y row elegidos
    function setNewMatch() {
        match.timeWhite = newMatchParams.time;
        match.timeBlack = newMatchParams.time;
        makeEmptyBoard();
        setMatchState(GameLogic.getWinner(match.board));
        setBoard(match.board);
    }

    function playMove(row: number,col: number) {
        if (matchState === "ongoing") {
            makePlay(row, col);
            setMatchState(GameLogic.getWinner(match.board));
            setBoard(match.board);
        }
    }

    return <div className="game-div">
        <Menu setNewBoard={setNewMatch}/>
        <div className="game-info-div">
            <GameInfo matchState={matchState} setMatchState={setMatchState}/>
            <div className="board-div">
                <Board board={board} onPlay={playMove} matchState={matchState}/>
            </div>
        </div>
    </div>
}