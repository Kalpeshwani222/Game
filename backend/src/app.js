const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
const cors = require("cors");
const JWT = require("jsonwebtoken");
const connectDB = require("./db/db");
const { VerifyAccessToken } = require("./middlewares/auth.middleware");
require("./db/init_redis");

//routes import
const authRoute = require("./routes/auth.routes");
const dashboardRoute = require("./routes/dashboard.routes");

const app = express();
app.use(express.json());
//cors policy
app.use(cors());
//connect to the DB
connectDB();

//routes declaration
app.get("/", VerifyAccessToken, async (req, res, next) => {
  console.log(req.user);
  res.send("HEllo");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);

//all the route catch this route any of the routes
// is not defined then handle by this route
app.use(async (req, res, next) => {
  // const error = new Error("Not found");
  // error.status = 404;
  // next(error);
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: Token required"));
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        //  return next(createError.Unauthorized());
        return next(new Error("Authentication error: Token expired"));
      } else {
        // return next(createError.Unauthorized(err.message));
        return next(new Error("Authentication error: Token expired"));
      }
    }
    //   req.payload = payload;
    console.log("WOWO", payload.aud);

    socket.userId = payload.aud;

    next();
  });
});

app.set("io", io);

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);
  // const userId = socket.handshake.query.userId;
  console.log("A user connected", socket.id);
  // const userId = socket.handshake.query.userId;
  const userId = socket.userId;
  // Join the user's socket to their unique room based on userId
  // socket.join(userId);

  if (userId) {
    socket.join(userId);
  }

  socket.on("disconnect", () => {
    socket.leave(userId);
  });
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const redisClient = require("./db/init_redis");
// const { checkWinner } = require("./helpers/checkWinner");
// // const { checkWinner } = require("./utils/checkWinner");

// const PORT = 8000;

// app.use(cors());
// app.use(express.json());

// //create server
// const server = app.listen(PORT, () => {
//   console.log(`app running on ${PORT}`);
// });

// // Initialize Socket.io
// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);

//   socket.on("joinGame", async ({ gameId, player }) => {
//     socket.join(gameId);

//     //Initialize game state if it doesn't exists
//     let board =
//       JSON.parse(await redisClient.hGet(`game:${gameId}`, "board")) ||
//       Array(9).fill("");
//     let turn = (await redisClient.hGet(`game:${gameId}`, "turn")) || "X";
//     let players =
//       (await redisClient.hGet(`game:${gameId}`, "players")) ||
//       JSON.stringify([player]);

//     redisClient.hSet(`game:${gameId}`, "board", JSON.stringify(board));
//     redisClient.hSet(`game:${gameId}`, "turn", turn);
//     redisClient.hSet(`game:${gameId}`, "players", players);

//     // io.to(gameId).emit("gameState", { board, turn, players });
//     io.to(gameId).emit("gameState", {
//       board,
//       turn,
//       players: JSON.parse(players), // Parse players to ensure it's an array
//     });
//   });

//   socket.on("makeMove", async ({ gameId, index, symbol }) => {
//     let board = JSON.parse(await redisClient.hGet(`game:${gameId}`, "board"));
//     let turn = await redisClient.hGet(`game:${gameId}`, "turn");

//     if (board[index] === "" && turn === symbol) {
//       board[index] = symbol;
//       turn = symbol === "X" ? "O" : "X";

//       // Check for a winner
//       const winner = checkWinner(board);
//       if (winner) {
//         io.to(gameId).emit("gameOver", { board, winner });

//         // Save game results to MongoDB
//         const players = JSON.parse(
//           await redisClient.hGet(`game:${gameId}`, "players")
//         );
//         // await Game.create({ gameId, players, winner, coinsAwarded: true });

//         redisClient.del(`game:${gameId}`); // Clear game from Redis
//       } else {
//         // Update game state in Redis
//         redisClient.hSet(`game:${gameId}`, "board", JSON.stringify(board));
//         redisClient.hSet(`game:${gameId}`, "turn", turn);

//         io.to(gameId).emit("moveMade", { board, turn });
//       }
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });
