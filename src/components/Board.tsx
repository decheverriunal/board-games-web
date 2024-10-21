"use client"

import './Board.css';

export default function Board({board, onPlay, isHumanPlaying}: {
    board: string[][];
    onPlay: (row: number, col: number) => void;
    isHumanPlaying: () => boolean;
}) {

    const state = board.map((value,index) => {
        const row = value.map((val,ind) => {
            return <Square color={val} key={ind} cols={value.length} onSquareClick={() => {
                if (isHumanPlaying() && board[index][ind] === " ") onPlay(index,ind)
            }} />
        })
        return <div key={index} className="board-row">
            {row}
        </div>
    })

    return <div className='board'>
        {state}
    </div>
}

function Square({color, cols, onSquareClick}: {
    color: string;
    cols: number;
    onSquareClick: () => void
}) {
    return <div 
            className="square" 
            style={{ 
                width: `min(80px,calc(60vw/${cols}))`, 
                height: `min(80px,calc(60vw/${cols}))` 
            }} 
            onClick={onSquareClick}>
        <div className={"piece" + color}>

        </div>
    </div>
}