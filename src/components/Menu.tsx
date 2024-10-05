"use client"

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

    return <>
        <label>Dimensiones del tablero</label>
        <input
            type="number"
            id="row" 
            name="row"
            onChange={handleRowChange}
        />
        <input
            type="number"
            id="col" 
            name="col"
            onChange={handleColChange}
        />
        <label>Jugador 1</label>
        <input
            type="text"
            id="player1" 
            name="player1"
            onChange={handlePlayer1Change}
        />
        <label>Jugador 2</label>
        <input
            type="text"
            id="player2" 
            name="player2"
            onChange={handlePlayer2Change}
        />
        <button onClick={setNewBoard}>
            Nuevo tablero
        </button>
    </>
}