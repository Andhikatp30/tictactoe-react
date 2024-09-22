import React, { useState } from 'react';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null); // State untuk pemenang
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const [scoreX, setScoreX] = useState(0); // Skor pemain X
  const [scoreO, setScoreO] = useState(0); // Skor pemain O

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    const gameWinner = calculateWinner(newSquares); // Hitung pemenang
    if (gameWinner) {
      setWinner(gameWinner); // Set pemenang
      setShowModal(true); // Tampilkan modal saat pemenang ditemukan

      // Update skor pemain
      if (gameWinner === 'X') {
        setScoreX(scoreX + 1);
      } else if (gameWinner === 'O') {
        setScoreO(scoreO + 1);
      }
    }
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-2xl md:text-3xl lg:text-4xl font-semibold">{status}</div>
      
      {/* Tampilan Skor */}
      <div className="flex space-x-10 mb-4">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">
          X Score: <span className="text-blue-600">{scoreX}</span>
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">
          O Score: <span className="text-purple-600">{scoreO}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {/* Modal Notifikasi Pemenang */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 animate-bounce">🎉 Congratulations!</h2>
            <p className="text-xl mb-4 text-gray-700">The winner is: <span className="font-bold text-purple-500">{winner}</span></p>
            <button
              onClick={() => {
                setShowModal(false);
                setSquares(Array(9).fill(null)); // Reset game
                setWinner(null);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg hover:shadow-2xl transform hover:scale-110"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
