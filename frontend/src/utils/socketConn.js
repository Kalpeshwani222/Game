// socket.js
import { io } from "socket.io-client";
import { getCurrentUserDetails } from "./localStorageOperations";

// Replace this URL with your backend server URL
const SOCKET_SERVER_URL = "http://localhost:5000";

// Function to initialize and return the socket instance
const initializeSocket = () => {
  const accessToken = getCurrentUserDetails();

  // Only connect if userId is available
  if (!accessToken) {
    throw new Error("accessToken  is required to establish a socket connection.");
  }

  const socket = io(SOCKET_SERVER_URL, {
    // query: { userId }, // Pass userId as a query parameter

    auth: {
      token: accessToken, // Pass the token in the headers for authentication
    },

    withCredentials: true,
    transports: ["websocket"], // Prefer WebSocket for reduced latency
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Connected to socket server with ID:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return socket;
};

export default initializeSocket;
