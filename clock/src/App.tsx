import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined)
  
  
  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const start = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (onBreak) {
              setOnBreak(false);
              return sessionLength * 60;
            } else {
              setOnBreak(true);
              return breakLength * 60;
            }
          }
          return prevTime - 1;
        })
      }, 1000);
    }
  }
  

  

  const reset = () => {
    clearInterval(intervalRef.current);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setOnBreak(false);
    intervalRef.current = undefined;
  };

  const breakDecrement = () => {
    if (breakLength <= 1) {
      return;
    } else {
    setBreakLength(breakLength - 1);
    }
  };

  const breakIncrement = () => {
    if (breakLength >= 60) {
      return;
    } else {
    setBreakLength(breakLength + 1);
    }
  };

  const sessionDecrement = () => {
    if (sessionLength <= 1) {
      return;
    } else {
    setSessionLength(sessionLength - 1);
    }
  };

  const sessionIncrement = () => {
    if (sessionLength >= 60) {
      return;
    } else {
    setSessionLength(sessionLength + 1);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  return (
    <>
      <h2 id="break-label">Break Length: </h2>
      <h2 id="session-label">Session Length: </h2>
      <button id="break-decrement" onClick={breakDecrement}>Break Decrement</button>
      <button id="session-decrement" onClick={sessionDecrement}>Session Decrement</button>
      <button id="break-increment" onClick={breakIncrement}>Break Increment</button>
      <button id="session-increment" onClick={sessionIncrement}>Session Increment</button>
      <div id="break-length">{breakLength}</div>
      <div id="session-length">{sessionLength}</div>
      <h3 id="timer-label">{onBreak ? 'Break' : 'Session'}</h3>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={start}>Start/Stop</button>
      <button id="reset" onClick={reset}>Reset</button>
    </>
  )
}

export default App
