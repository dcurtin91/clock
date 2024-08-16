import { useState } from 'react'

import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  

  return (
    <>
      <h2 id="break-label">Break Length: </h2>
      <h2 id="session-label">Session Length: </h2>
      <button id="break-decrement"></button>
      <button id="session-decrement"></button>
      <button id="break-increment"></button>
      <button id="session-increment"></button>
      <div id="break-length">{breakLength}</div>
      <div id="session-length">{sessionLength}</div>
      <h3 id="timer-label">Session</h3>
    </>
  )
}

export default App
