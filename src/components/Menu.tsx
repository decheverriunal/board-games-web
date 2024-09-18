"use client"

export default function Menu({ changeRow, changeCol, setNewBoard }:{
    changeRow: (num: number) => void;
    changeCol: (num: number) => void;
    setNewBoard: () => void;
}) {

    function handleRowChange(e: React.ChangeEvent<HTMLInputElement>) {
        changeRow(parseInt(e.target.value))
    }

    function handleColChange(e: React.ChangeEvent<HTMLInputElement>) {
        changeCol(parseInt(e.target.value))
    }

    return <>
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
        <button onClick={setNewBoard}>
            Nuevo tablero
        </button>
    </>
}