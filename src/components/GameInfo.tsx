"use client"

import { useEffect, useRef } from 'react';
import { match } from "../utils/matchLogic";

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
            if (matchState === "ongoing" && match.moveNumber > 1 && toPlay === "W") {
                if (toPlay === playing.current) {
                    setTimeW(-new Date().getTime() + timeStart.current + timeAccumulatedW.current);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedW.current = timeW;
                    playing.current = toPlay;
                    setTimeW(-new Date().getTime() + timeStart.current + timeAccumulatedW.current);
                }
            } else if (matchState === "ongoing" && match.moveNumber > 1 && toPlay === "B") {
                if (toPlay === playing.current) {
                    setTimeB(-new Date().getTime() + timeStart.current + timeAccumulatedB.current);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedB.current = timeB;
                    playing.current = toPlay;
                    setTimeB(-new Date().getTime() + timeStart.current + timeAccumulatedB.current);
                }
            } else if (match.moveNumber === 1) {
                playing.current = toPlay;
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

    function displayTime(time: number) {
        let decimal;
        if (time < 1000) {
            decimal = Math.ceil(time / 10)
        } else {
            decimal = Math.round(time / 100) % 10
        }
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 60000) % 60)
        const hours = Math.floor((time / 3600000))
        const h = (hours < 10) ? "0" + hours : hours;
        const min = (minutes < 10) ? "0" + minutes : minutes;
        const sec = (seconds < 10) ? "0" + seconds : seconds;
        return h + ":" + min + ":" + sec + "." + decimal;
    }

    return <div className="info-div">
        <div className='info-white'></div>
        <h1 className="info">{displayTime(timeW)}</h1>
        <h1 className="info info-winner">{displayWinner()}</h1>
        <h1 className="info">{displayTime(timeB)}</h1>
        <div className='info-black'></div>
    </div>

}