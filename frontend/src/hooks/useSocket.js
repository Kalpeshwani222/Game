// useSocket.js
import { useEffect, useRef } from "react";
import initializeSocket from "../utils/socketConn";

const useSocket = (eventName, callback) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize the socket with userId
    socketRef.current = initializeSocket();

    // Listen to a specific event
    socketRef.current.on(eventName, callback);

    // Clean up socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
        socketRef.current.disconnect();
      }
    };
  }, [eventName, callback]);

  return socketRef.current;
};

export default useSocket;
