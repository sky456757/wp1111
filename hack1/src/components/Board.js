/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    let a = [0,1,2,3,4,5]
    /*
    for(var i = 0; i < turn;i++)
    {
        a.push(i);
    }*/
    //alert(a)
    return (
        <div className="Board-container">
            
            {a.map((e) => ((e === turn) ? <CurRow id={"row_" + e} key ={"row_" + e} curGuess ={curGuess} rowIdx ={e}/> : <Row id={"row_" + e} key ={"row_" + e} guess ={guesses[e]} rowIdx = {e} turn ={turn}/>))}
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            
        </div>
    )
};
export default Board;
