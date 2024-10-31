import { CoinsIcon, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Match = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [isXTurn, setIsXTurn] = useState(true); // Toggle turns between X and O

  const handleClick = (index) => {
    if (board[index]) return; // Ignore if cell is already filled

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O"; // Place X or O
    setBoard(newBoard);
    setIsXTurn(!isXTurn); // Toggle the turn
  };
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="font-medium uppercase text-center text-2xl">Match</h1>
        <div>
          <p>Coins match</p>
          <Link className="mx-auto w-fit border px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
            <CoinsIcon className="fill-yellow-500" />
            200
          </Link>
        </div>
      </div>
      <div className="text-center my-4">
        <p className="uppercase font-medium">Match Score</p>
        <div className="flex gap-x-2 justify-center items-center">
          <StarIcon className="size-8 fill-green-600" />
          <StarIcon className="size-8" />
          <StarIcon className="size-8" />
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-3">
        <div className="text-center border-r border-gray-500">
          <p className="font-bold">Player A</p>
          <p className="truncate">Rushikesh Wani</p>
          {/* <Link className="mx-auto w-fit border px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
            <CoinsIcon className="fill-yellow-500" />
            200
          </Link> */}
        </div>
        <div className="text-center border-r border-gray-500">
          <p className="font-bold">Current Turn</p>
          <p>Player A</p>
        </div>
        <div className="text-center">
          <p className="font-bold">Player B</p>
          <p className="truncate">Kalpesh Wani</p>
          {/* <Link className="mx-auto w-fit border px-3 py-1 rounded-full flex flex-row items-center justify-center gap-x-1 bg-slate-100">
            <CoinsIcon className="fill-yellow-500" />
            200
          </Link> */}
        </div>
      </div>
      <div className="my-5 flex items-center justify-center bg-gray-100">
        <div className="my-10 grid grid-cols-3 gap-1 w-72 h-72">
          {board.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 flex items-center justify-center text-2xl font-bold cursor-pointer 
              bg-white border-2 border-gray-300 hover:bg-gray-200 transition-colors"
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Match;
