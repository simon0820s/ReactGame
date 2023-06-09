import React, { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import WinnerModal from "./components/WinnerModal.jsx";
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";

//App
const App = () => {
  //States
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    //no repeat validator
    if (board[index] || winner) return;

    //update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);

    //Check Winner
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      window.localStorage.removeItem("board");
      window.localStorage.removeItem("turn");
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      window.localStorage.removeItem("board");
      window.localStorage.removeItem("turn");
    }

    //toggle turn
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
  };

  return (
    <main className="board">
      <h1>Tic Tac toe</h1>
      <button onClick={resetGame}>Resetear</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  );
};

export default App;
