import React from "react";
import router from "routes/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

// import React, { useEffect, useState } from "react";
// import router from "routes/routes";
// import { RouterProvider } from "react-router-dom";
// import io from "socket.io-client";
// const socket = io("http://localhost:8000");

// const App = () => {
//   // return <RouterProvider router={router} />;
//   const [gameId, setGameId] = useState("");
//   const [player, setPlayer] = useState({ name: "", symbol: "" });
//   const [joined, setJoined] = useState(false);

//   const handleJoin = () => {
//     if (gameId && player.name && player.symbol) {
//       setJoined(true);
//     }
//   };

//   useEffect(() => {
//     alert("");
//   }, []);

//   return (
//     <div>
//       {!joined ? (
//         <div>
//           <h1>Join a Game</h1>
//           <input type="text" placeholder="Enter Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)} />
//           <input type="text" placeholder="Enter Your Name" value={player.name} onChange={(e) => setPlayer({ ...player, name: e.target.value })} />
//           <select value={player.symbol} onChange={(e) => setPlayer({ ...player, symbol: e.target.value })}>
//             <option value="">Select Your Symbol</option>
//             <option value="X">X</option>
//             <option value="O">O</option>
//           </select>
//           <button onClick={handleJoin}>Join Game</button>
//         </div>
//       ) : (
//         <Game gameId={gameId} player={player} />
//       )}
//     </div>
//   );
// };

// const Game = ({ gameId, player }) => {
//   const [board, setBoard] = useState(Array(9).fill(""));
//   const [turn, setTurn] = useState("X");
//   const [players, setPlayers] = useState([]);
//   const [winner, setWinner] = useState(null);
//   useEffect(() => {
//     // Join the game room
//     socket.emit("joinGame", { gameId, player });

//     // Listen for game state updates
//     socket.on("gameState", ({ board, turn, players }) => {
//       setBoard(board);
//       setTurn(turn);
//       setPlayers(players);
//     });

//     // Listen for moves made by other players
//     socket.on("moveMade", ({ board, turn }) => {
//       setBoard(board);
//       setTurn(turn);
//     });

//     // Listen for the game over event
//     socket.on("gameOver", ({ board, winner }) => {
//       setBoard(board);
//       setWinner(winner);
//     });

//     // Clean up on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [gameId, player]);

//   const handleMove = (index) => {
//     if (board[index] === "" && !winner && turn === player.symbol) {
//       socket.emit("makeMove", { gameId, index, symbol: player.symbol });
//     }
//   };

//   return (
//     <>
//       {" "}
//       <div>
//         <h1>Tic-Tac-Toe</h1>
//         <div>
//           <h2>Players: {players.join(" vs ")}</h2>
//           <h3>Current Turn: {turn}</h3>
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
//           {board.map((cell, index) => (
//             <div
//               key={index}
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 border: "1px solid #000",
//                 fontSize: "2rem",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleMove(index)}
//             >
//               {cell}
//             </div>
//           ))}
//         </div>
//         {winner && <h2>{winner} wins!</h2>}
//       </div>
//     </>
//   );
// };
// export default App;
