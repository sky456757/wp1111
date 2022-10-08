/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/
//import { findAdj } from './findAdj';
export const revealed = (board, x, y, newNonMinesCount,boardSize) => {
    board[x][y].revealed = true;
    newNonMinesCount--;
    //alert(newNonMinesCount)
    if(board[x][y].value === 0)
    {
      if(x-1 !== -1)
      {
        if(board[x-1][y].value !== '💣' && board[x-1][y].flagged === false && board[x-1][y].revealed === false)
        {
          let n = revealed(board, x-1, y, newNonMinesCount,boardSize);
          newNonMinesCount = n.newNonMinesCount;
          board = n.board;

        }
        if(y-1 !== -1)
        {
          if(board[x-1][y-1].value !== '💣' && board[x-1][y-1].flagged === false && board[x-1][y-1].revealed === false)
          {
            let n = revealed(board, x-1, y-1, newNonMinesCount,boardSize);
            newNonMinesCount = n.newNonMinesCount;
            board = n.board;
          }
        }
        if(y+1 !== boardSize)
        {
          if(board[x-1][y+1].value !== '💣' && board[x-1][y+1].flagged === false && board[x-1][y+1].revealed === false)
          {
            let n = revealed(board, x-1, y+1, newNonMinesCount,boardSize);
            newNonMinesCount = n.newNonMinesCount;
            board = n.board;
          }
        }
      }
      if(x+1 !== boardSize)
      {
        if(board[x+1][y].value !== '💣' && board[x+1][y].flagged === false && board[x+1][y].revealed === false)
        {
          let n = revealed(board, x+1, y, newNonMinesCount,boardSize);
          newNonMinesCount = n.newNonMinesCount;
          board = n.board;
        }
        if(y-1 !== -1)
        {
          if(board[x+1][y-1].value !== '💣' && board[x+1][y-1].flagged === false && board[x+1][y-1].revealed === false)
          {
            let n = revealed(board, x+1, y-1, newNonMinesCount,boardSize);
            newNonMinesCount = n.newNonMinesCount;
            board = n.board;
          }
        }
        if(y+1 !== boardSize)
        {
          if(board[x+1][y+1].value !== '💣' && board[x+1][y+1].flagged === false && board[x+1][y+1].revealed === false)
          {
            let n = revealed(board, x+1, y+1, newNonMinesCount,boardSize);
            newNonMinesCount = n.newNonMinesCount;
            board = n.board;
          }
        }
      }
      if(y-1 !== -1)
      {
        if(board[x][y-1].value !== '💣' && board[x][y-1].flagged === false && board[x][y-1].revealed === false)
        {
          let n = revealed(board, x, y-1, newNonMinesCount,boardSize);
          newNonMinesCount = n.newNonMinesCount;
          board = n.board;
        }
      }
      if(y+1 !== boardSize)
      {
        if(board[x][y+1].value !== '💣' && board[x][y+1].flagged === false && board[x][y+1].revealed === false)
        {
          let n = revealed(board, x, y+1, newNonMinesCount,boardSize);
          newNonMinesCount = n.newNonMinesCount;
          board = n.board;
        }
      }
    }
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    return { board, newNonMinesCount };
};
