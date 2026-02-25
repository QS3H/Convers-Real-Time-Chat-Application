import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // When user connects, add them to the map
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    // Remove user from the map
    delete userSocketMap[userId];
    
    // Send updated online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
