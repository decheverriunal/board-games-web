"use client"

import './Board.css';
import { match } from "../utils/matchLogic";
import { useEffect, useRef } from 'react';

export default function Board({board, onPlay, matchState}: {
    board: string[][];
    onPlay: (row: number, col: number) => void;
    matchState: string;
}) {

    const controller = useRef<AbortController>()

    useEffect(() => {
        if (!match.humanToPlay && matchState === "ongoing") {

            if (controller.current) {
                controller.current.abort();
            }

            controller.current = new AbortController();
            const signal = controller.current.signal;

            fetch("http://localhost:3001/compute",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    board: match.board,
                    toPlay: match.toPlay,
                    time: match.toPlay === "W" ? match.timeWhite : match.timeBlack
                }),
                signal
            })
            .then((response) => response.json())
            .then((data) => {
                if (match.timeWhite > 0 && match.timeBlack > 0 && !match.humanToPlay) {
                    onPlay(data[0],data[1]);
                }
            })
        }
    }, [board, matchState, onPlay]);

    const state = board.map((value,index) => {
        const row = value.map((val,ind) => {
            return <Square color={val} key={ind} cols={Math.max(value.length,board.length)} onSquareClick={() => {
                if (match.humanToPlay && board[index][ind] === " ") onPlay(index,ind)
            }} />
        })
        return <div key={index} className="board-row">
            {row}
        </div>
    })

    return <div className='board' style={{ 
        width: `min(60vw,90vh)`
    }} >
        {state}
    </div>
}

function Square({color, cols, onSquareClick}: {
    color: string;
    cols: number;
    onSquareClick: () => void
}) {
    const squareType = (cols <= 10) ? "bg-square" : "sm-square";

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