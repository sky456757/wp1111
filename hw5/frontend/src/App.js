import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState ,useRef,Fragment} from 'react';
import { guess, startGame, restart } from './axios';
function App() {
  const [hasStarted, setHasStarted] = useState(false) 
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const val = useRef('')
  const handleGuess = async () => {
    setNumber(val.current.value)
    const response = await guess(val.current.value)
    //alert(response)
    //const response = "Equal"
      if (response === 'Equal') setHasWon(true)
      else if(response === 'server not response')
      {
        setHasStarted(false)
      }
      else {
        setStatus(response)
        setNumber('')
        val.current.value = '';
      }
    }
  const handleRe = async () =>{
    //alert(1)
    const r = await restart()
    //alert(r)
    if(r != 'server not response')
    {
      setHasWon(false);
      setStatus('')
      setNumber('')
    }
    else
    {
      setHasStarted(false)
    }
  }
  const start = async () =>{
    setStatus('')
    setNumber('')
    setHasWon(false)
    const s = await startGame()
    //alert(s)
    if(s !== 'server not response')
      setHasStarted(true)
  }
  const startMenu =
  <div>
    <button onClick = {start}> start game </button>
  </div>
  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input ref={val}></input>
      <button onClick={handleGuess} > guess! </button>
      <p>{status}</p>
    </>
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
      onClick={handleRe}  // Handle restart for backend and frontend
      >restart</button>
    </>)
  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
