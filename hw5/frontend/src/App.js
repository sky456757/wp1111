import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState ,useRef,Fragment} from 'react';
import { guess, startGame, restart ,startGame2,guess2} from './axios';
function App() {
  const [hasStarted, setHasStarted] = useState(false) 
  const [hasWon, setHasWon] = useState(false)
  const [gameover, setGameover] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [status2, setStatus2] = useState([])
  const [chance, setChance]  = useState(10)
  const [mode, setMode] = useState(0)
  const val = useRef('')
  const start = async () =>{
    setStatus('')
    setNumber('')
    setHasWon(false)
    const s = await startGame()
    //alert(s)
    if(s !== 'server not response')
    {
      setHasStarted(true)
      setMode(1)
      setGameover(false)
      setHasWon(false)
      setChance(10)
    }
  }
  const start2 = async () =>{
    setStatus2([])
    setNumber('')
    setHasWon(false)
    const s = await startGame2()
    //alert(s)
    if(s !== 'server not response')
    {
      setMode(2)
      setHasStarted(true)
      setGameover(false)
      setHasWon(false)
    }
  }
  const handleGuess = async () => {
    setNumber(String(val.current.value))
    const response = await guess(String(val.current.value),chance)
    //alert(response)
    //const response = "Equal"
      if (response === 'Equal')
      {
        setHasWon(true)
        setGameover(true)
      }
      else if(response === 'server not response')
      {
        setHasStarted(false)
      }
      else if(response ==='toStart')
      {
          //alert()
        setHasStarted(false)
      }
      else if(response === 'input error')
      {
        val.current.value = '';
        setNumber('')
      }
      else {
        setStatus(response)
        setChance(chance-1)
        //setNumber('')
        val.current.value = '';

      }
    }
  
  useEffect (() =>{
    if(chance !== 10)
      setStatus(status +" chance remain "+chance+" times")
    if(chance === 0)
    {
      setGameover(true);
      if(!hasWon)
        setNumber(status)
    }
  },[chance])
  const handleGuess2 = async () => {
    setNumber(String(val.current.value))
    const response = await guess2(String(val.current.value))
    //alert(response)
    //const response = "Equal"
      if(response === 'server not response')
      {
        setHasStarted(false)
      }
      else if(response === 'input error')
      {
        val.current.value = '';
        setNumber('')
      }
      else {
        setStatus(response)
        //setChance(chance-1)
        //let tmpstatus = status2;
        //tmpstatus.push(response)
        setStatus2 (response);
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
      setGameover(false);
      setChance(10);
      setStatus('');
      setNumber('');
    }
    else
    {
      setHasStarted(false)
    }
  }
  const back = () =>{
    setHasStarted(false)
  }
  const startMenu =
  <div>
    <button onClick = {start}> Mode1 </button>
    <button onClick = {start2}> Mode2 </button>
  </div>
  const gameMode1 = 
    <>
      <p>1A2B game</p>
      <p>try to guest (four differant digit)</p>
      <input ref={val}></input>
      <button onClick={handleGuess} > guess! </button>
      <p>{status}</p>
    </>
  const gameMode2 = 
  <>
    <p>1A2B game</p>
    <p>let cpu guest your number (four differant numbers)</p>
    <input ref={val}></input>
    <button onClick={handleGuess2} > start! </button>
    <button
      onClick={back}  // Handle restart for backend and frontend
      >backToTitle</button>
    {status2.map((e) => (<p>{e}</p>))}
  </>
  const gameMode = mode === 1 ? gameMode1 : gameMode2
  const winningMode = (
    <>
      {hasWon ? <p>you won! the number was {number}.</p> : <p>you lose! the number was {number}.</p>}
      <button
      onClick={handleRe}  // Handle restart for backend and frontend
      >restart</button>
      <button
      onClick={back}  // Handle restart for backend and frontend
      >backToTitle</button>
    </>)
  const game = 
    <div>
      {gameover ? winningMode : gameMode}
    </div>
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
