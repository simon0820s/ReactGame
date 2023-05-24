import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
  //Check Winner
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] &&
      boardToCheck[a] == boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null);
};

export const resetGame = ({setBoard,setTurn,setWinner}) => {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
};
