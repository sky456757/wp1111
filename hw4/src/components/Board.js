/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';

let N = {
    value: null,
    revealed: null,
    x: null,
    y: null,
    flagged: null
}
const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState(Array.from({length: boardSize},()=> Array.from({length: boardSize}, () => N)));                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(-1);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState(Array.from({length: mineNum},()=> Array.from({length: 2}, () => null)));     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.
    let a = 1;
    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);
 
    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        for (let i = 0; i < boardSize; i++)
        {
            setBoard(newBoard.board)
        }

        let mine_temp = []
        for (let i = 0; i < mineNum; i++) {
            mine_temp.push(newBoard.mineLocations[i])
            setMineLocations(newBoard.mineLocations);

        }
        setNonMineCount(boardSize*boardSize - mineNum);
        // Hint: Read the definition of those Hook useState functions and make good use of them.

    }
    //alert(board[0][0].value)
    //alert(board[0][0])
    //alert(mineLocations[0][1])
    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
        setRemainFlagNum(0);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        if(!newBoard[x][y].revealed && !gameOver)
            if(!newBoard[x][y].flagged)
            {
                newBoard[x][y].flagged = true;
                setRemainFlagNum(newFlagNum  +1);
            }
            else
            {
                newBoard[x][y].flagged = false;
                setRemainFlagNum(newFlagNum  - 1);
            }
        setBoard(newBoard)
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        if(newBoard[x][y].value!== '💣')
        {
            //if(nonMineCount === 1)
                //setWin(true)
            let n = revealed(board,x,y,nonMineCount,boardSize)

            setBoard(n.board)
            setNonMineCount(n.newNonMinesCount)
        }
        else
        {
            setGameOver(true);
        }
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };
    useEffect(() => {
        if(nonMineCount === 0)
            setWin(true);
    });
    let r = [];
    let c = [];
    for (let x = 0; x < boardSize; x++)
    {
        r.push("row" + x)
    }
    for (let x = 0; x < boardSize; x++)
    {
        c.push(x)
    }
    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
        

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer' >
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} win={win}/>
                    {
                        r.map((item) => (
                        <div id = {item} style = {{display: "flex"}}>
                            {c.map((item2) => (
                                //<div className='cell' id = {r.indexOf(item) + item2}  style = {{display: "flex"}}></div>
                                <Cell rowIdx= {r.indexOf(item)} colIdx= {item2} detail= {board[item2][r.indexOf(item)]} updateFlag= {updateFlag} revealCell= {revealCell}/>
                                // rowIdx, colIdx, detail, updateFlag, revealCell
                            ))}
                        </div>
                        )) 
                        //(nonMineCount === 0) ? setWin(true) : null
                    }

                </div>
                
            </div>
            {(gameOver || win) ? <Modal restartGame={restartGame} backToHome={backToHome} win={win}/> : null}
        </div>
    );



}

export default Board