import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null); // Cek apakah seri

  let status;
  if (winner) {
    status = `Pemenang: ${winner}`;
  } else if (isDraw) {
    status = "Seri!";
  } else {
    status = `Giliran: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="page">
      <h2>Tic Tac Toe</h2>
      <div className="instructions">Pilih kotak untuk bermain!</div>
      <h3>Tic-Tac-Toe merupakan salah satu permainan papan sederhana. Permainan ini dimainkan oleh dua pemain dengan cara mengisi kolom pada papan dengan bidak X atau bidak O sedemikian hingga terbentuk garis sejajar secara vertikal, horizontal dan diagonal.</h3>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, i) => (
          <button className="square" key={i} onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}

export default TicTacToe;