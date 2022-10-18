/****************************************************************************
  FileName      [ useWordle.js ]
  PackageName   [ src/components/hook ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file handles each action in the Wordle game. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useState } from 'react';


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);                            // An integer whose default is 0. 0 <= turn <= 5.
    const [usedChars, setUsedChars] = useState({});                 // A dictionary object which store characters' color that showed on the keyboard. (Ex: {e: 'yellow', c:'grey'})
    const [curGuess, setCurGuess] = useState("");                   // A string whose default is "". 0 <= curGuess.length <= 5.
    const [isCorrect, setIsCorrect] = useState(false);              // A bool whose default is false. It will be set true only when curGuess === solution.
    const [guesses, setGuesses] = useState([...Array(6)]);          // An array whose length is 6. (Ex: [[{char:'c', color:'grey'},{char:'o', color:'grey'},{char:'d', color:'grey'},{char:'e', color:'yellow'},{char:'s', color:'grey'}],[],[],[],[],[]])

    // You can use this function to print all the parameters you want to know.
    const printTest = () => {
        console.log("*-----------------------*");
        console.log("solution: ", solution);
        console.log("turn: ", turn);
        console.log("usedChars:", usedChars);
        console.log("curGuess: ", curGuess);
        console.log("isCorrect: ", isCorrect);
        console.log("guesses: ", guesses);
    }

    // Handle the actions of `Enter`
    const handleEnter = () => {
        // (1) Enter is invalid if turn > 5
        if (turn > 5) {
            console.log("Error: You have used all your guesses");
            return;
        }
        // (2) Enter is invalid if curGuess is not a 5-character string
        if (curGuess.length !== 5) {
            console.log("Error: Only ", curGuess.length, " characters are entered!");
            return;
        }
        // (3) Press Enter, store curGuess to guesses, reset curGuess and update parameters .
        let tempGuess = [...Array(6)];
        for(var i = 0; i< turn;i++)
        {
            tempGuess[i] = guesses[i];
        }
        const mySet = new Set();
        const mySet2 = {};
        for(var i = 0; i< solution.length;i++)
        {
            if(mySet.has(solution[i]))
            {
                mySet2[solution[i]] = mySet2[solution[i]]+1;
            }
            else
            {
                mySet.add(solution[i]);
                mySet2[solution[i]] = 1;
            }
        }
        let letters = curGuess.split('');
        tempGuess[turn] = [{char:letters[0], color:'grey'},{char:letters[1], color:'grey'},{char:letters[2], color:'grey'},{char:letters[3], color:'grey'},{char:letters[4], color:'grey'}];
        let tempChars = usedChars;
        for(var i = 0; i< solution.length;i++)
        {
            if(solution[i] === letters[i])
            {
                tempGuess[turn][i].color = 'green'
                tempChars[letters[i]] = 'green';
                if(mySet2[solution[i]] === 1)
                {
                    mySet.delete(letters[i]);
                    mySet2[solution[i]] = 0;
                }
                else
                {
                    mySet2[solution[i]] = mySet2[solution[i]]-1;
                }
            }
            else if(mySet.has(letters[i]))
            {
                tempGuess[turn][i].color = 'yellow'
                if(usedChars[letters[i]] !== 'green')
                    tempChars[letters[i]] = 'yellow';
                if(mySet2[letters[i]] === 1)
                {
                    mySet.delete(letters[i]);
                    mySet2[letters[i]] = 0;
                }
                else
                {
                    mySet2[letters[i]] = mySet2[letters[i]]-1;
                }
            }
            else
            {
                tempChars[letters[i]] = 'grey';
            }
        }
        setUsedChars(tempChars)
        //alert(tempGuess[0][0].color);
        setGuesses(tempGuess);
        if(curGuess === solution)
            setIsCorrect(true)
        //setUsedChars();
        //alert(tempGuess[0][0].char)
        // console.log("Press Enter!!!! Store and reset curGuess!");
        // TODO 4: Check each wordbox's color in `curGuess` and update `guess`, `turn` and `curGuess`
        // Hint: check green first, and then check yellow.
        // add the formatted guess generated into guesses.

        // turn += 1
        setTurn(turn+1)
        // set curGuess to default
        if(turn<5 && !isCorrect)
            setCurGuess("")

        // TODO 5: update parameters, check each char usage and show in `Keyboard` and reset `curGuess`.
        // 5-1) check if curGuess === solution, if true, set `isCorrect` to true.
        
        
        // 5-2) usedChars update
        
        
    }

    // Handle the action of `Backspace`
    const handleBackspace = () => {
        setCurGuess(curGuess.substring(0, curGuess.length - 1));
    }

    // Handle the action of pressing a character.
    const handleCharacter = (key) => {
        // If curGuess's length is longer than 5, do nothing
        if (curGuess.length < 5){
            setCurGuess(curGuess + key);
        }
    }
    const handleKeyup = ({ key }) => {
        // console.log("You just press: ", key);
        if (key === 'Enter' && !isCorrect) handleEnter();
        else if (key === 'Backspace' && !isCorrect) handleBackspace();
        else if (/^[A-Za-z]$/.test(key) && !isCorrect) handleCharacter(key);
    }
    return { turn, curGuess, guesses, isCorrect, usedChars, handleKeyup, printTest };
}

export default useWordle;
