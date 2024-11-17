import { useState, useEffect, useRef } from "react";
import './Timer.css'

function Timer() {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(null)

    useEffect(() => {
        if (isRunning)
            intervalIdRef.current = setInterval(() => setElapsedTime(Date.now() - startTimeRef.current), 10)
        return () => clearInterval(intervalIdRef.current)
    }, [isRunning])

    function toggleBtn() {
        setIsRunning(prevState => !prevState)
        startTimeRef.current = Date.now() - elapsedTime
    }

    function resetBtn() {
        setIsRunning(false)
        setElapsedTime(0)
    }
    function formatTime() {
        let hour = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minute = Math.floor(elapsedTime / (1000 * 60) % 60)
        let second = Math.floor(elapsedTime / (1000) % 60)
        let millisecond = Math.floor((elapsedTime % 1000) / 10)
        return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}:${padZero(millisecond)}`
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num
    }
    
    return (
        <>
            <div className="timer-box">
                <span className="timer-face">{formatTime()}</span>
                <div className="timer-console">
                    <button onClick={toggleBtn} className="tgl-btn">{isRunning ? "Stop" : "Start"}</button>
                    <button onClick={resetBtn} className="rst-btn">Reset</button>
                </div>
            </div>
        </>
    )
}

export default Timer