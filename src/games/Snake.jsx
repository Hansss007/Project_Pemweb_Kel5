import React, { useState, useEffect } from "react";
import "./Snake.css";

const boardSize = 10;
const initialSnake = [[0, 0]];
const initialFood = [5, 5];

function Snake() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState([0, 1]); // mulai gerak ke kanan
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // State untuk menyimpan skor

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection([-1, 0]);
          break;
        case "ArrowDown":
          setDirection([1, 0]);
          break;
        case "ArrowLeft":
          setDirection([0, -1]);
          break;
        case "ArrowRight":
          setDirection([0, 1]);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      if (gameOver) return;
      const newHead = [
        (snake[0][0] + direction[0] + boardSize) % boardSize,
        (snake[0][1] + direction[1] + boardSize) % boardSize
      ];
      const newSnake = [newHead, ...snake];
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood([
          Math.floor(Math.random() * boardSize),
          Math.floor(Math.random() * boardSize)
        ]);
        setScore((prevScore) => prevScore + 1); // Tambah skor saat makan
      } else {
        newSnake.pop();
      }

      // Cek tabrakan diri
      for (let i = 1; i < newSnake.length; i++) {
        if (
          newSnake[i][0] === newHead[0] &&
          newSnake[i][1] === newHead[1]
        ) {
          setGameOver(true);
          return;
        }
      }

      setSnake(newSnake);
    }, 200);

    return () => clearInterval(move);
  }, [snake, direction, food, gameOver]);

  const handleReset = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0); // Reset skor saat game direset
  };

  return (
    <div className="snake-container"> {/* Tambahkan container utama */}
      <h2>Snake Game</h2> {/* Judul game Snake */}
      <div className="instructions">Gunakan tombol panah untuk menggerakkan ular.</div> {/* Instruksi singkat */}
      <h3>Snake adalah permainan klasik di mana Anda mengontrol seekor ular yang tumbuh panjang saat memakan makanan. Hindari menabrak dinding atau diri Anda sendiri!</h3> {/* Deskripsi game */}
      <div className="score">Score: {score}</div> {/* Tampilkan skor */}
      <div className="snake-board">
        {[...Array(boardSize)].map((_, row) => (
          <div key={row} className="snake-row">
            {[...Array(boardSize)].map((_, col) => {
              const isHead = snake[0][0] === row && snake[0][1] === col; // Cek apakah ini kepala
              const isFood = food[0] === row && food[1] === col;
              const isSnakeBody = snake.some(([r, c], index) => index > 0 && r === row && c === col); // Cek apakah ini badan

              return (
                <div
                  key={col}
                  className={`snake-cell ${isHead ? "snake-head" : isSnakeBody ? "snake" : ""} ${isFood ? "food" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p className="final-score">Final Score: {score}</p>
          <button className="reset-button" onClick={handleReset}>Reset Game</button>
        </div>
      )}
      {!gameOver && <button className="reset-button" onClick={handleReset}>Reset Game</button>} {/* Tombol reset selalu ada */}
    </div>
  );
}

export default Snake;