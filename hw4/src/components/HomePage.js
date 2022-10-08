/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      {
        !error
        ?
        <button className ="btn" onClick={startGameOnClick}>
          start
        </button>
        :
        <button className ="btn" onClick={() => (alert("ERROR: Mines number and board size are invalid!"))}>
          start
        </button>
      }
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className ="controlContainer">
        <button className ="btn" onClick={() => (!showPanel ? setShowPanel(true) : setShowPanel(false))}>Difficulty Adjustment</button>
        {
          showPanel ? 
          <div className ="controlWrapper">
            {error ? <div className='error' style={{color: "#880000"}}>ERROR: Mines number and board size are invalid!</div>: null}
            <div className ="controlCol">
              <p className='controlTitle'>Mines Number</p>
              <input type = 'range' step = '1' min = {1} max = {100} defaultValue = {mineNum}
              onChange = {(event)=> {
                mineNumOnChange(Number(event.target.value))
                if(event.target.value >= boardSize*boardSize && !error)
                {
                  setError(true)
                }
                else if(event.target.value < boardSize*boardSize && error)
                {
                  setError(false)
                }
              }}
              />
              {error ? <p className='controlNum' style={{color: "#880000"}}>{mineNum}</p> : <p className='controlNum'>{mineNum}</p>}
            </div>
            <div className ="controlCol">
              <p className='controlTitle'>Board Size (nxn)</p>
              <input type = 'range' step = '1' min = {1} max = {10} defaultValue = {boardSize}
              onChange = {(event)=> {
                boardSizeOnChange(Number(event.target.value))
                if(mineNum >= event.target.value*event.target.value && !error)
                {
                  setError(true)
                }
                else if(mineNum < event.target.value*event.target.value && error)
                {
                  setError(false)
                }
              }}
              />
              {error ? <p className='controlNum' style={{color: "#880000"}}>{boardSize}</p> : <p className='controlNum'>{boardSize}</p>}
            </div>
          </div>
          :
          null
        }
      </div>

    </div>
  );

}
export default HomePage;   