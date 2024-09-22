import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Board />
      </div>
    </div>
  );
}

export default App;
