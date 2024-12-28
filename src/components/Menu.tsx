"use client"

import { useRef, useState } from "react";
import "./Menu.css"

export default function Menu({ changeRow, changeCol, setNewBoard, setPlayer1, setPlayer2, setTime }:{
    changeRow: (num: number) => void;
    changeCol: (num: number) => void;
    setNewBoard: () => void;
    setPlayer1: (player: string) => void;
    setPlayer2: (player: string) => void;
    setTime: (time: number) => void;
}) {

    const [hide, setHide] = useState(false);
    const [isCustomTime, setIsCustomTime] = useState(false);
    const customTime = useRef(0);

    function hideMenu() {
        setHide(!hide)
    }

    function handleRowChange(e: React.ChangeEvent<HTMLInputElement>) {
        changeRow(parseInt(e.target.value));
    }

    function handleColChange(e: React.ChangeEvent<HTMLInputElement>) {
        changeCol(parseInt(e.target.value));
    }

    function handlePlayer1Change(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayer1(e.target.value);
    }

    function handlePlayer2Change(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayer2(e.target.value);
    }

    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        customTime.current = parseInt(e.target.value) * 1000;
        if (isCustomTime) setTime(customTime.current);
    }

    function handleTimeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        if (parseInt(e.target.value) === 0) {
            setTime(customTime.current);
            setIsCustomTime(true);
        } else {
            setTime(parseInt(e.target.value));
            setIsCustomTime(false);
        }
    }

    return <>
    <button className={hide ? "display-button button-show" : "display-button"} onClick={hideMenu}>{hide ? ">" : "<"}</button>
    <div className={hide ? "menu hidden-menu" : "menu"}>
        <label id="dims-label">Board dimensions</label>
        <label className="num-label">Rows</label>
        <input
            type="text"
            inputMode="numeric"
            className="num-input"
            id="row" 
            name="row"
            onChange={handleRowChange}
        />
        <label className="num-label">Columns</label>
        <input
            type="text"
            inputMode="numeric"
            className="num-input"
            id="col" 
            name="col"
            onChange={handleColChange}
        />
        <label className="player-label">Player 1</label>
        <input
            type="text"
            className="player-type-input"
            id="player1" 
            name="player1"
            onChange={handlePlayer1Change}
        />
        <label className="player-label">Player 2</label>
        <input
            type="text"
            className="player-type-input"
            id="player2" 
            name="player2"
            onChange={handlePlayer2Change}
        />
        <label className="time-label">Time</label>
        <select className="time-input" name="time" onChange={handleTimeSelect}>
            <option value={60000}>1 minute</option>
            <option value={120000}>2 minutes</option>
            <option value={300000}>5 minutes</option>
            <option value={600000}>10 minutes</option>
            <option value={1800000}>30 minutes</option>
            <option value={3600000}>1 hour</option>
            <option value={7200000}>2 hours</option>
            <option value={10800000}>3 hours</option>
            <option value={0}>Custom {"(seconds)"}</option>
        </select>
        <input
            type="text"
            className={isCustomTime ? "time-input" : "time-input hidden-menu"}
            id="time" 
            name="time"
            onChange={handleTimeChange}
        />
        <button id="make-board" onClick={setNewBoard}>
            New board
        </button>
    </div>
    </>
}