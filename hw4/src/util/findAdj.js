import React from "react";


export const findAdj = (board, x, y, newNonMinesCount,boardSize) => {
    const extend = (board, x, y, newNonMinesCount,boardSize) =>{
        if(x + 1 !== boardSize -1)
        {
            if(board[x+1][y].value !== '💣')
            {
                
            }
            else
            {

            }
            board[x][y].revealed = true;
            newNonMinesCount--;
            this(board, x+1, y, newNonMinesCount);
        }
        else
        {

        }
    }
    const stop = () =>{
        board[x][y].revealed = true;
        newNonMinesCount--;
        return { board, newNonMinesCount };
    }
    const ID = rowIdx.toString() + '-' + colIdx.toString()
    return (
        (board[x][y].value === 0) ? stop : extend
        

    );
}