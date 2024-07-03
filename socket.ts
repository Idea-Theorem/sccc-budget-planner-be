import { Socket } from "socket.io";

const socketIo = require("socket.io");

module.exports = (server: any) => {
  const io = socketIo(server);

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    // Listen for a 'message' event from the client
    socket.on("message", (msg) => {
      console.log("message: " + msg);
      // Broadcast the message to all clients
      io.emit("message", msg);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  });

  return io;
};
