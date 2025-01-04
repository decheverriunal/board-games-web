"use client"

import { useEffect, useRef, useState } from 'react';
import { match } from "../utils/matchLogic";

export default function GameInfo({matchState,setMatchState}:{
    matchState: string;
    setMatchState: (state: string) => void;
}) {
    const timeStart = useRef(0);
    const timeAccumulatedW = useRef(0);
    const timeAccumulatedB = useRef(0);
    const playing = useRef("");

    const [tW, setTW] = useState(60000);
    const [tB, setTB] = useState(60000);

    useEffect(() => {
        function setTimeWhite(time: number) {
            if (time <= 0) {
                setMatchState("B")
            }
            match.timeWhite = Math.max(0,time);
        }
    
        function setTimeBlack(time: number) {
            if (time <= 0) {
                setMatchState("W")
            }
            match.timeBlack = Math.max(0,time);
        }
        const timer = setInterval(() => {
            if (matchState === "ongoing" && match.moveNumber > 1 && match.toPlay === "W") {
                if (match.toPlay === playing.current) {
                    setTimeWhite(-new Date().getTime() + timeStart.current + timeAccumulatedW.current);
                    setTW(match.timeWhite);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedW.current = match.timeWhite;
                    playing.current = match.toPlay;
                    setTimeWhite(-new Date().getTime() + timeStart.current + timeAccumulatedW.current);
                    setTW(match.timeWhite);
                }
            } else if (matchState === "ongoing" && match.moveNumber > 1 && match.toPlay === "B") {
                if (match.toPlay === playing.current) {
                    setTimeBlack(-new Date().getTime() + timeStart.current + timeAccumulatedB.current);
                    setTB(match.timeBlack);
                } else {
                    timeStart.current = new Date().getTime();
                    timeAccumulatedB.current = match.timeBlack;
                    playing.current = match.toPlay;
                    setTimeBlack(-new Date().getTime() + timeStart.current + timeAccumulatedB.current);
                    setTB(match.timeBlack);
                }
            } else if (match.moveNumber === 1) {
                playing.current = match.toPlay;
            } else {
                timeAccumulatedW.current = 0
                timeAccumulatedB.current = 0
                setTW(match.timeWhite);
                setTB(match.timeBlack);
                if (matchState !== "ongoing") {
                    clearInterval(timer);
                }
            }
        }, 100);

        return () => clearInterval(timer);
    }, [matchState, setMatchState])

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
        if (time < 900) {
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
        <h1 className="info">{displayTime(tW)}</h1>
        <h1 className="info info-winner">{displayWinner()}</h1>
        <h1 className="info">{displayTime(tB)}</h1>
        <div className='info-black'></div>
    </div>

}