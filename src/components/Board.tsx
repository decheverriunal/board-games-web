"use client"

import './Board.css';

export default function Board({board, onPlay, isHumanPlaying}: {
    board: string[][];
    onPlay: (row: number, col: number) => void;
    isHumanPlaying: boolean;
}) {

    const state = board.map((value,index) => {
        const row = value.map((val,ind) => {
            return <Square color={val} key={ind} onSquareClick={() => {if (isHumanPlaying && board[index][ind] === " ") onPlay(index,ind)}} />
        })
        return <div key={index} className="board-row">
            {row}
        </div>
    })

    return <>
        {state}
    </>
}

function Square({color, onSquareClick}: {
    color: string;
    onSquareClick: () => void
}) {
    return <div className="square" onClick={onSquareClick}>
        <div className={"piece" + color}>

        </div>
    </div>
}