"use client"

import { useEffect, useRef } from 'react';

export default function GameInfo({timeW,timeB,setTimeW,setTimeB,matchState,toPlay}:{
    timeW: number;
    timeB: number;
    setTimeW: (num: number) => void;
    setTimeB: (num: number) => void;
    matchState: string;
    toPlay: string;
}) {
    const timeStart = useRef(0);
    const timeAccumulatedW = useRef(0);
    const timeAccumulatedB = useRef(0);
    const playing = useRef("");

    useEffect(() => {
        const timer = setInterval(() => {
            if (matchState === "ongoing" && toPlay === "W") {
                if (toPlay === playing.current) {
                    setTimeW(new Date().getTime() - timeStart.current + timeAccumulatedW.current);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedW.current = timeW;
                    playing.current = toPlay;
                    setTimeW(new Date().getTime() - timeStart.current + timeAccumulatedW.current);
                }
            } else if (matchState === "ongoing" && toPlay === "B") {
                if (toPlay === playing.current) {
                    setTimeB(new Date().getTime() - timeStart.current + timeAccumulatedB.current);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedB.current = timeB;
                    playing.current = toPlay;
                    setTimeB(new Date().getTime() - timeStart.current + timeAccumulatedB.current);
                }
            } else {
                timeAccumulatedW.current = 0
                timeAccumulatedB.current = 0
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [matchState, setTimeB, setTimeW, timeB, timeW, toPlay])

    function displayWinner() {
        if (matchState === "W") {
            return "White wins!"
        } else if (matchState === "B") {
            return "Black wins!"
        } else if (matchState === "tie") {
            return "Tie!"
        } else {
            return ""
        }
    }

    return <div className="info-div">
        <h1 className="info">{timeW/1000}</h1>
        <h1 className="info">{displayWinner()}</h1>
        <h1 className="info">{timeB/1000}</h1>
    </div>

}