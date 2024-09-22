import React from 'react';

function Square({ value, onClick }) {
  return (
    <button
      className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-2 border-gray-500 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold bg-white hover:bg-gray-200 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
