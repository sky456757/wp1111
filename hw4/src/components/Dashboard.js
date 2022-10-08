/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver ,win}) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

 

  let T = 0;
  useEffect(() => {
    setSTime(0);
    setTime(0);
    T = 0;
    timeIntervalId = setInterval(() => 
    {
      T++
      setSTime(T)
      setTime(T)
      
    }
      
    , 1000);
    
  }, []);

  useEffect(() => {
    clearInterval(timeIntervalId)
    if(!gameOver && !win)
    { 
      setSTime(0);
      setTime(0);
      T = 0;
      timeIntervalId = setInterval(() => 
      {
        T++
        setSTime(T)
        setTime(T)
      }
      
      , 1000);
    }
    


  },[gameOver,win]);


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
