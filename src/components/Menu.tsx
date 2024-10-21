"use client"

import "./Menu.css"

export default function Menu({ changeRow, changeCol, setNewBoard, setPlayer1, setPlayer2 }:{
    changeRow: (num: number) => void;
    changeCol: (num: number) => void;
    setNewBoard: () => void;
    setPlayer1: (player: string) => void;
    setPlayer2: (player: string) => void;
}) {

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

    return <div className="menu">
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
        <button id="make-board" onClick={setNewBoard}>
            New board
        </button>
    </div>
}