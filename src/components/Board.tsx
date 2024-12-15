"use client"

import './Board.css';

export default function Board({board, onPlay, isHumanPlaying}: {
    board: string[][];
    onPlay: (row: number, col: number) => void;
    isHumanPlaying: () => boolean;
}) {

    const state = board.map((value,index) => {
        const row = value.map((val,ind) => {
            return <Square color={val} key={ind} cols={Math.max(value.length,board.length)} onSquareClick={() => {
                if (isHumanPlaying() && board[index][ind] === " ") onPlay(index,ind)
            }} />
        })
        return <div key={index} className="board-row">
            {row}
        </div>
    })

    return <div className='board' style={{ 
        width: `min(60vw,90vh)`,
        height: `calc(min(60vw,90vh)*${board.length}/${Math.max(board[0].length,board.length)})`
    }} >
        {state}
    </div>
}

function Square({color, cols, onSquareClick}: {
    color: string;
    cols: number;
    onSquareClick: () => void
}) {
    let squareType = (cols <= 10) ? "bg-square" : "sm-square";

    return <div 
            className={"square" + " " + squareType}
            style={{ 
                width: `min(80px,calc(60vw/${cols}),calc(90vh/${cols}))`, 
                height: `min(80px,calc(60vw/${cols}),calc(90vh/${cols}))` 
            }} 
            onClick={onSquareClick}>
        <div className={"piece" + color}>

        </div>
    </div>
}